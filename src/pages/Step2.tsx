import {
  Typography,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DemoContext from "../context/DemoContext";
import ConfigurationContext from "../context/ConfigContext";
import { Category } from "../model/model";
import { getGeminiModel } from "../gemini/client";
import { GenerativeContentBlob, InlineDataPart } from "@google/generative-ai";
import GBackdrop from "../components/GBackdrop";


const initialCategories = () => {
  return new Array<Category>();
};

const Step2 = () => {
  const ctx = useContext(DemoContext);
  const {config} = useContext(ConfigurationContext);
  const nav = useNavigate();

  const [backdrop, setBackdrop] = useState(true);
  const [categories, setCategories] =
    useState<Array<Category>>(initialCategories);
  const [selectedCategory, setSelectedCategoy] = useState<number>(-1);

  useEffect(() => {
    if (categories.length === 0) {
      const model = getGeminiModel(config);

      let prompt = config.promptDetectCategories;
      prompt = prompt.replace(
        "${category_model}",
        JSON.stringify({
          name: "",
          attributes: [{ name: "", description: "", valueRange: [] }],
        } as Category)
      );

      model
        .generateContent([
          { text: prompt },
          {
            inlineData: {
              data: ctx.image.base64,
              mimeType: ctx.image.type,
            } as GenerativeContentBlob,
          } as InlineDataPart,
        ])
        .then((result) => {
          console.log(result.response.text());
          const tempCats = JSON.parse(
            result.response.text()
          ) as Array<Category>;
          setCategories([...categories, ...tempCats]);
          setBackdrop(false);
        });
    }
  }, [ctx.image]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(`Selecting Category: ${event.target.value}`);
    setSelectedCategoy(parseInt(event.target.value));
  };

  const handleClick = () => {
    ctx.category = categories[selectedCategory];
    nav("/demo/3");
  };

  return (
    <React.Fragment>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Choose one of the suggested categories
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper elevation={1} sx={{ borderRadius: "7px" }}>
            <img
              src={ctx.image.uri}
              style={{ width: "100%", objectFit: "contain" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <React.Fragment>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card raised={true} sx={{ borderRadius: "7px" }}>
                  <CardHeader title="Categories" />
                  <CardContent>
                    <RadioGroup onChange={handleCategoryChange}>
                      {categories.map((c: Category, idx) => (
                        <FormControlLabel
                          key={`cat_sel_${idx}`}
                          value={idx}
                          control={<Radio />}
                          label={c.name}
                        />
                      ))}
                    </RadioGroup>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "right" }}>
                    <Button
                      variant="contained"
                      disabled={selectedCategory === -1}
                      onClick={handleClick}
                    >
                      Next
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ borderRadius: "7px" }}>
                  <CardHeader
                    title="Attributes"
                    subheader={
                      selectedCategory > -1
                        ? categories[selectedCategory].name
                        : ""
                    }
                  />
                  <CardContent>
                    <List>
                      {selectedCategory > -1 ? (
                        categories[selectedCategory].attributes.map(
                          (attr, attrIdx) => (
                            <ListItem key={`cat_attr_li_${attrIdx}`}>
                              <Box>
                                {attr.name} - {attr.description}
                                {attr.valueRange.length > 0 ? (
                                  <>
                                    <br />
                                    <Typography variant="body2">
                                      {attr.valueRange.join(", ")}
                                    </Typography>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </Box>
                            </ListItem>
                          )
                        )
                      ) : (
                        <></>
                      )}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </React.Fragment>
        </Grid>
      </Grid>
      <GBackdrop backdrop={backdrop} setBackdrop={setBackdrop} />
    </React.Fragment>
  );
};

export default Step2;
