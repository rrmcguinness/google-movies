import { ReactNode, useContext, useEffect, useState } from "react";
import DemoContext from "../context/DemoContext";
import React from "react";
import {
  Box,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Movie, MovieAttributeValue } from "../model/model";
import { useNavigate } from "react-router-dom";
import ConfigurationContext from "../context/ConfigContext";
import { getGeminiModel } from "../gemini/client";
import { GenerativeContentBlob, InlineDataPart } from "@google/generative-ai";
import { Languages } from "../model/languages";
import AddIcon from "@mui/icons-material/Add";
import GBackdrop from "../components/GBackdrop";
import ProductDetail from "../components/ProductDetail";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const a11yProps = (index: number) => {
  return {
    id: `ph-tab-${index}`,
    "aria-controls": `ph-tabpanel-${index}`,
  };
};

function ProductTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`ph-tabpanel-${index}`}
      aria-labelledby={`ph-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const initialMovie = (language: string): Movie => {
  return {
    language: language,
    name: "",
    description: "",
    seoHtmlHeader: "",
    attributeValues: new Array<MovieAttributeValue>(),
  } as Movie;
};

const init = () => {
  return new Array<Movie>();
};

const Step3 = () => {
  const ctx = useContext(DemoContext);
  const { config } = useContext(ConfigurationContext);
  const nav = useNavigate();

  if (!ctx.image || !ctx.image.uri || !ctx.category) {
    nav("/demo");
  }

  const [backdrop, setBackdrop] = useState(true);
  const [language, setLanguage] = useState<string>(ctx.default_language);
  const [selectedTab, setSelectedTab] = useState(0);
  const [products, setProducts] = useState<Array<Movie>>(init);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const p = products[newValue];
    setLanguage(p.language);
    setSelectedTab(newValue);
  };

  const handleLanguageChange = (
    event: SelectChangeEvent<string>,
    _: ReactNode
  ) => {
    setLanguage(event.target.value);
  };

  const addLanguage = () => {
    if (language) {
      console.log(`seleted language: ${language}`);

      if (products.filter((p) => p.language === language).length === 0) {
        setBackdrop(true);
        const model = getGeminiModel(config);

        let prompt = config.promptTranslateProductDetail;

        const baseProduct = products.filter(
          (p) => p.language === ctx.default_language
        );

        if (baseProduct) {
          prompt = prompt.replace("${base_language}", ctx.default_language);
          prompt = prompt.replace("${target_language}", language);
          prompt = prompt.replace(
            "${product_json}",
            JSON.stringify(baseProduct[0])
          );

          console.log(prompt);

          model.generateContent([{ text: prompt }]).then((result) => {
            console.log(result.response.text());
            const newProduct = JSON.parse(result.response.text()) as Movie;
            setProducts([...products, newProduct]);
            setBackdrop(false);
            setSelectedTab(products.length);
          });
        } else {
          console.log(`No base product for lang ${ctx.default_language}`);
        }
      } else {
        console.log("Language already exists");
      }
    }
  };

  useEffect(() => {
    if (
      products.filter((p) => p.language === ctx.default_language).length === 0
    ) {
      const model = getGeminiModel(config);

      const product = initialMovie(ctx.default_language);

      let prompt = config.promptExtractProductDetail;
      prompt.replace(
        "${product_attribute_value_model}",
        JSON.stringify({ name: "", value: "" } as MovieAttributeValue)
      );
      prompt.replace(
        "${category_attributes}",
        JSON.stringify(ctx.category.attributes)
      );
      prompt.replace("${product_json}", JSON.stringify(product));

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
          const tempProduct = JSON.parse(result.response.text()) as DeviceMotionEventRotationRate;
          const mergedProduct = { ...product, ...tempProduct };
          setProducts([...products, mergedProduct]);
          setBackdrop(false);
        });
    }
  }, [config]);

  return (
    <React.Fragment>
      <Grid container spacing={2} padding={2}>
        <Grid item xs={6}>
          <Typography variant="h5">
            Preview, Edit / Approve Movie Details
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Stack direction={"row"} spacing={2} sx={{ justifyContent: "right" }}>
            <FormControl>
              <InputLabel id="all-languages-label">Languages</InputLabel>
              <Select
                id="language-select"
                size="small"
                labelId="all-languages-label"
                value={language}
                label="Languages"
                onChange={handleLanguageChange}
                sx={{ minWidth: "180px" }}
              >
                {Languages.map((l, idx) => (
                  <MenuItem
                    key={`lng_${idx}`}
                    value={l.value}
                    disabled={
                      products.filter((p) => p.language === l.value).length > 0
                    }
                  >
                    {l.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ "& > :not(style)": { m: 0 } }}>
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={addLanguage}
              >
                <AddIcon />
              </Fab>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Tabs value={selectedTab} onChange={handleTabChange}>
        {products.map((entry, idx) => (
          <Tab key={`tab_${idx}`}
            label={Languages.filter((l) => l.value === entry.language)[0].name}
            {...a11yProps(idx)}
          />
        ))}
      </Tabs>

      {products.map((entry, idx) => (
        <ProductTabPanel key={`tab_panel_${idx}`} value={selectedTab} index={idx}>
          <ProductDetail product={entry} />
        </ProductTabPanel>
      ))}

      <GBackdrop backdrop={backdrop} setBackdrop={setBackdrop} />
    </React.Fragment>
  );
};

export default Step3;
