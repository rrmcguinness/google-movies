import { Grid, Card, CardMedia, CardContent, Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DemoContext from "../context/DemoContext";
import { imageToBase64 } from "../utils";
import { Image } from "../model/model";

type ImageCardArgs = {
    title: string;
    img: string;
  };
  
  const ImageCard = ({ title, img }: ImageCardArgs) => {
    const demoCtx = useContext(DemoContext);
    const nav = useNavigate();
  
    const handleClick = (img: string) => {
      imageToBase64(img, (image: Image) => {
        demoCtx.image = image;
        nav("/demo/2");
      });
    };
  
    return (
      <Grid item xs={4}>
        <Card sx={{ maxWidth: "230px", mb: 2, borderRadius: '7px' }} raised={true}>
          <CardMedia
            sx={{ height: "200px", mb: 0, pb: 0 }}
            image={img}
            title={title}
          />
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={() => handleClick(img)}>
                <Typography variant="body2">{title}</Typography>
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  export default ImageCard