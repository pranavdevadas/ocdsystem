import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import AddAadhaar from "../components/AddAadhaar";
import { FaIdCard } from "react-icons/fa";

function HomeScreen() {
  return (
    <>
      <Container maxWidth="fixed">
        <Typography
          variant="h4"
          sx={{ textAlign: "center", paddingBottom: "20px" }}
        >
          <FaIdCard style={{ paddingTop: "1px" }} />
          &nbsp; Aadhaar OCR System
        </Typography>
        <Grid container spacing={2}>
          <AddAadhaar />
        </Grid>
      </Container>
    </>
  );
}

export default HomeScreen;
