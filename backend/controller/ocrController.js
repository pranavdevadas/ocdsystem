import {
  TextractClient,
  DetectDocumentTextCommand,
} from "@aws-sdk/client-textract";
import sharp from "sharp";
import fs from "fs/promises";
import dotenv from "dotenv";
import Aadhaar from "../model/aadaar.js";
dotenv.config();

const textract = new TextractClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.YOUR_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.YOUR_AWS_SECRET_ACCESS_KEY,
  },
});

const preprocessImage = async (filePath) => {
  const outputFilePath = filePath.replace(/(\.\w+)$/, "_processed$1");
  await sharp(filePath)
    .resize({ width: 1024, height: 1024, fit: "contain" })
    .grayscale()
    .normalize()
    .toFile(outputFilePath);
  return outputFilePath;
};

const parseAadhaarDetails = (text) => {
  const details = {};

  const lines = text.split("\n").slice(1).join("\n");
  const nameMatch = lines.match(/\b[A-Z\s]{3,}\b\n/);
  details.name = nameMatch ? nameMatch[0].trim() : "Not Found";

  const dobMatch = text.match(
    /\b(?:DOB|Date of Birth)\b[:\s-]*(\d{2}\/\d{2}\/\d{4})/i
  );
  details.dob = dobMatch ? dobMatch[1] : "Not Found";

  const genderMatch = text.match(/\b(Male|Female|Other)\b/i);
  details.gender = genderMatch ? genderMatch[0] : "Not Found";

  const aadhaarMatch = text.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);
  details.aadhaarNumber = aadhaarMatch
    ? aadhaarMatch[0].replace(/\s+/g, "")
    : "Not Found";

  const addressMatch = text.match(
    /(?:Address[:\s-]*)([\s\S]*?)(?=\b\d{4}\s?\d{4}\s?\d{4}\b)/i
  );

  details.address = addressMatch
    ? addressMatch[1]
        .replace(/[\n\r]/g, " ")
        .trim()
        .replace(/[^a-zA-Z0-9,.\s]/g, "")
        .replace(/\bDate\b/g, "")
        .replace(/\d{6}\s*$/, "")
    : "Not Found";

  return details;
};

const ocrController = {
  extractDetails: async (req, res) => {
    try {
      if (!req.files || req.files.length !== 2) {
        return res.status(400).json({
          success: false,
          message: "Both front and back images are required.",
        });
      }

      const preprocessAndExtract = async (filePath) => {
        const processedPath = await preprocessImage(filePath);

        const imageBuffer = await fs.readFile(processedPath);

        const command = new DetectDocumentTextCommand({
          Document: {
            Bytes: imageBuffer,
          },
        });

        const textractResponse = await textract.send(command);
        await fs.unlink(processedPath);

        const text = textractResponse.Blocks.filter(
          (block) => block.BlockType === "LINE"
        )
          .map((block) => block.Text)
          .join("\n");

        return text;
      };

      const frontText = await preprocessAndExtract(req.files[0].path);
      const backText = await preprocessAndExtract(req.files[1].path);

      const combinedText = `${frontText}\n${backText}`;
      const extractedDetails = parseAadhaarDetails(combinedText);

      const { aadhaarNumber, name, gender, address } = extractedDetails;

      const newAadhaar = new Aadhaar({
        aadhaarnumber: aadhaarNumber,
        name,
        gender,
        address,
      });

      try {
        await newAadhaar.save();
      } catch (error) {
        if (error.code !== 11000) {
          throw error;
        }
      }

      res.status(200).json({
        success: true,
        message: "Aadhaar details extracted successfully",
        data: extractedDetails,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "An error occurred during OCR processing.",
        error: error.message,
      });
    }
  },
};

export default ocrController;
