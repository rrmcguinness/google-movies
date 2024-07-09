import { Grid, Stack, Box, Card, CardMedia, CardHeader, CardContent, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import DemoContext from "../context/DemoContext";
import { Movie } from "../model/model";
import React from "react";

const ProductDetail = ({ product }: { product: Movie }) => {
    const ctx = useContext(DemoContext);
  
    return (
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Stack>
            <Box>
              <Card>
                <CardMedia
                  sx={{ height: "200px", mb: 0, pb: 0 }}
                  image={ctx.image.uri}
                />
                <CardHeader title="Keywords" />
                <CardContent>
                  <TextField
                    fullWidth
                    label="Keywords Header"
                    InputLabelProps={{ shrink: true }}
                    multiline
                    rows={5}
                    variant="outlined"
                    value={product.seoHtmlHeader}
                  />
                </CardContent>
              </Card>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={2}>
            <TextField
              fullWidth
              label="Name"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              value={product.name}
            />
  
            <TextField
              fullWidth
              label="Description"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              multiline
              rows={10}
              value={product.description}
            />

            <Typography variant="h5">Cast</Typography>
            <Typography>{product.actors.map((a, idx) => <React.Fragment key={`actor_key_${idx}`}>{a.characterName} ({a.name}), </React.Fragment>)}</Typography>
  
            <Typography variant="h5">Attributes</Typography>
  
            <Grid container spacing={2}>
              {product && product.attributeValues ? (
                product.attributeValues.map((v, vIdx) => (
                  <Grid key={`cat_attr_grd_${vIdx}`} item xs={4}>
                    <TextField
                      key={`cat_attr_val_${vIdx}`}
                      fullWidth
                      label={v.name}
                      InputLabelProps={{ shrink: true }}
                      variant="outlined"
                      value={v.value}
                    />
                  </Grid>
                ))
              ) : (
                <></>
              )}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    );
  };

  export default ProductDetail