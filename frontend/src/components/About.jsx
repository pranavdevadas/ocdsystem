import React from "react";
import { Grid, Paper, Typography } from "@mui/material";

function About() {
  return (
    <>
      <Grid item xs={7}>
        <Paper elevation={3} sx={{ padding: 2, marginTop: "113px" }}>
          <Typography variant="h5" sx={{ padding: 2, textAlign: "center" }}>
            About
          </Typography>
          <Typography sx={{ padding: 2, textAlign: "center" }}>
            <b>Aadhaar OCD</b> is an application designed to streamline the
            process of managing and uploading Aadhaar-related documents. It
            allows users to easily upload the front and back sides of their
            Aadhaar card securely. With a user-friendly interface, the app
            provides a seamless experience for Aadhaar document verification.
            The app also ensures data privacy and efficient handling of
            sensitive information, making it a reliable tool for users requiring
            Aadhaar-related services.
          </Typography>
        </Paper>
      </Grid>
    </>
  );
}

export default About;
