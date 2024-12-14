import React, { useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Backdrop,
  Box,
} from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdUpload } from "react-icons/md";
import axiosInstance from "../utils/axios";
import { toast } from "react-toastify";
import ShowDetails from "./ShowDetails";
import About from "./About";

const FileUpload = ({ label, side, preview, onFileChange }) => (
  <Grid item xs={12}>
    {preview ? (
      <img
        src={preview}
        alt={`${side} Preview`}
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "200px",
          objectFit: "contain",
          border: "1px dashed grey",
        }}
      />
    ) : (
      <Button color="primary" aria-label={`upload ${side}`} component="label">
        <input hidden accept="image/*" type="file" onChange={onFileChange} />
        <Box
          component="section"
          sx={{
            p: 11,
            border: "1px dashed grey",
            color: "#1973d2",
            textAlign: "center",
          }}
        >
          <FaCloudUploadAlt />
          <Typography>{label}</Typography>
        </Box>
      </Button>
    )}
  </Grid>
);

function AddAadhaar() {
  const [files, setFiles] = useState({ front: null, back: null });
  const [previews, setPreviews] = useState({ front: null, back: null });
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const handleFileChange = (e, side) => {
    const file = e.target.files[0];
    if (file) {
      const isValid = validateFile(file);
      if (!isValid) return;
      setFiles((prev) => ({ ...prev, [side]: file }));
      setPreviews((prev) => ({ ...prev, [side]: URL.createObjectURL(file) }));
    }
  };

  const validateFile = (file) => {
    const maxFileSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, JPEG, and PNG files are allowed.");
      return false;
    }
    if (file.size > maxFileSize) {
      toast.error("File size should not exceed 2MB.");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!files.front || !files.back) {
      toast.error("Please upload both front and back sides of Aadhaar.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("aadhaarImages", files.front);
    formData.append("aadhaarImages", files.back);

    try {
      const response = await axiosInstance.post("/extract", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response.data.message);
      console.log(response.data.data);
      setResponseData(response.data.data);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to extract details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Grid item xs={5}>
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ padding: 2 }}>
            Add Your Aadhaar
          </Typography>
          <Grid container justifyContent="center" spacing={2}>
            <FileUpload
              label="Upload Frontside of your Aadhaar"
              side="front"
              preview={previews.front}
              onFileChange={(e) => handleFileChange(e, "front")}
            />
            <FileUpload
              label="Upload Backside of your Aadhaar"
              side="back"
              preview={previews.back}
              onFileChange={(e) => handleFileChange(e, "back")}
            />

            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                sx={{ marginTop: "20px", width: "100%", borderRadius: "50px" }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: "white" }} />
                ) : (
                  <>
                    <MdUpload />
                    &nbsp; Submit
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      <Backdrop
        sx={(theme) => ({
          color: "#fff",
          zIndex: theme.zIndex.drawer + 1,
        })}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {responseData ? <ShowDetails data={responseData} /> : <About />}
    </>
  );
}

export default AddAadhaar;
