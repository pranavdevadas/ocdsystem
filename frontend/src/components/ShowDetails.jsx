import React from "react";
import { Grid, Paper, Typography, TextField, Button } from "@mui/material";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

function ShowDetails({ data }) {
  if (data.aadhaarNumber === "Not Found" && data.dob === "Not Found") {
    toast.error("Something wrong in your image. Add Proper Aadhaar");
  }

  const handleCopyName = () => {
    if (data.name) {
      navigator.clipboard
        .writeText(data.name)
        .then(() => {
          toast.success("Text copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy text: ", err);
        });
    }
  };
  const handleCopyAadhaarNumber = () => {
    if (data.aadhaarNumber) {
      navigator.clipboard
        .writeText(data.aadhaarNumber)
        .then(() => {
          toast.success("Text copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy text: ", err);
        });
    }
  };
  const handleCopyDob = () => {
    if (data.dob) {
      navigator.clipboard
        .writeText(data.dob)
        .then(() => {
          toast.success("Text copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy text: ", err);
        });
    }
  };
  const handleCopyGender = () => {
    if (data.gender) {
      navigator.clipboard
        .writeText(data.gender)
        .then(() => {
          toast.success("Text copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy text: ", err);
        });
    }
  };
  const handleCopyAddress = () => {
    if (data.address) {
      navigator.clipboard
        .writeText(data.address)
        .then(() => {
          toast.success("Text copied to clipboard!");
        })
        .catch((err) => {
          toast.error("Failed to copy text: ", err);
        });
    }
  };

  if (
    (data.gender === "Not Found" && data.address === "Not Found") ||
    data.address === "Not Found"
  ) {
    toast.error("Something wrong in your image. Add Proper Aadhaar");
  }

  return (
    <Grid item xs={7}>
      {data && (
        <>
          <Paper elevation={3} sx={{ padding: 2, marginTop: "113px" }}>
            <Typography variant="h6" sx={{ padding: 2 }}>
              Extracted Details
            </Typography>
            <Grid container spacing={2} justifyContent="flex-start">
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="name"
                  label="Name"
                  variant="filled"
                  value={data.name ?? ""}
                />
              </Grid>
              <Button onClick={handleCopyName}>
                <FaRegCopy />
                Copy
              </Button>

              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="age"
                  label="Date Of Birth"
                  variant="filled"
                  value={data.dob ?? ""}
                />
              </Grid>
              <Button onClick={handleCopyDob}>
                <FaRegCopy />
                Copy
              </Button>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="aadhaar-number"
                  label="Aadhaar Number"
                  variant="filled"
                  value={data.aadhaarNumber ?? ""}
                />
              </Grid>
              <Button onClick={handleCopyAadhaarNumber}>
                <FaRegCopy />
                Copy
              </Button>

              <Grid item xs={2.5}>
                <TextField
                  fullWidth
                  id="gender"
                  label="Gender"
                  variant="filled"
                  value={data.gender ?? ""}
                />
              </Grid>
              <Button onClick={handleCopyGender}>
                <FaRegCopy />
                Copy
              </Button>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  multiline
                  rows={3.5}
                  variant="filled"
                  value={data.address ?? ""}
                />
              </Grid>
              <Button onClick={handleCopyAddress}>
                <FaRegCopy />
                Copy
              </Button>
            </Grid>
          </Paper>
        </>
      )}
    </Grid>
  );
}

export default ShowDetails;
