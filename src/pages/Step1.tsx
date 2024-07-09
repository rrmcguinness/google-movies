import {
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import React from "react";
import back_to_the_future from "../assets/Back_to_the_Future.jpg";
import mr_right from "../assets/Mr_Right_poster.jpg";
import shawshank from "../assets/ShawshankRedemptionMoviePoster.jpg";
import boy_who from "../assets/The_Boy_Who_Harnessed_the_Wind.jpg";
import fall_guy from "../assets/The_Fall_Guy_(2024)_poster.jpg";
import martian from "../assets/The_Martian_film_poster.jpg";
import ImageCard from "../components/ImageCard";

const Step1 = () => {
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Select a movie.
          </Typography>
          <Grid container spacing={2} maxWidth={"800px"}>
            <ImageCard title="Classics" img={back_to_the_future} />
            <ImageCard title="Romantic Commedy" img={mr_right} />
            <ImageCard title="Thriller" img={shawshank} />
            <ImageCard title="Drama" img={boy_who} />
            <ImageCard title="Action" img={fall_guy} />
            <ImageCard title="SciFi" img={martian} />
          </Grid>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default Step1;
