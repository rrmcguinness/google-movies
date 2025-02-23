import {
  Box,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import ConfigurationContext from "../context/ConfigContext";
import geminiLogo from "../assets/gemini.jpg";

import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import Looks4Icon from "@mui/icons-material/Looks4";
import Looks5Icon from "@mui/icons-material/Looks5";
import React from "react";
import { Config } from "../model/config";
import { useNavigate } from "react-router-dom";

const GeminiLogo = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
      <Paper
        elevation={6}
        sx={{
          borderRadius: "10px",
          minWidth: "400px",
          minHeight: "200px",
          backgroundImage: `url(${geminiLogo})`,
          backgroundSize: "400px",
          backgroundPosition: "center",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
          <Typography
            color={"white"}
            sx={{ fontFamily: "Google Sans", fontSize: 20 }}
          >
            Welcome to Google Cloud's
          </Typography>
        </Box>
        <Box
          sx={{
            display: "block",
            position: "relative",
            top: "112px",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography
              color={"white"}
              sx={{ fontFamily: "Google Sans", fontSize: 20 }}
            >
              Google @ The Movies
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const RegisteredBody = ({ config }: { config: Config }) => {
  return (
    <React.Fragment>
      <Typography variant="h5">Welcome: {config.customerName}</Typography>
      <Typography variant="body2">
        Presented By: {config.engineerLdap}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Today's demonstration of Gemini will illustrate the following steps:
      </Typography>

      <List>
        <ListItem>
          <ListItemIcon>
            <LooksOneIcon />
          </ListItemIcon>
          Creates a custom, Zero Shot. - Category Detection from the image
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <LooksTwoIcon />
          </ListItemIcon>
          Creates a custom, Multi Shot. - Attribute value extraction, SEO
          writing, Description Writing, Programmable Objects.
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Looks3Icon />
          </ListItemIcon>
          * Chain of Thought Prompting. - A custom agent to help tune the product
          description.
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Looks4Icon />
          </ListItemIcon>
          Multi-Language Support
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Looks5Icon />
          </ListItemIcon>
          Grounded Truth Tooling - Using Google Search Engine
        </ListItem>
      </List>

      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        Agent Settings
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: "10px", p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            Agent Persona:
          </Grid>
          <Grid item xs={9}>
            {config.generativeConfig.instructions}
          </Grid>

          <Grid item xs={3}>
            Temperture:
          </Grid>
          <Grid item xs={9}>
            {config.generativeConfig.temperature}
          </Grid>

          <Grid item xs={3}>
            Top P:
          </Grid>
          <Grid item xs={9}>
            {config.generativeConfig.topP}
          </Grid>

          <Grid item xs={3}>
            Top K:
          </Grid>
          <Grid item xs={9}>
            {config.generativeConfig.topK}
          </Grid>

          <Grid item xs={3}>
            Max Tokens:
          </Grid>
          <Grid item xs={9}>
            {config.generativeConfig.maxTokenCount}
          </Grid>
        </Grid>
      </Paper>
      <Typography sx={{ mt: 2 }}></Typography>
    </React.Fragment>
  );
};

const PleaseRegister = () => {
  const nav = useNavigate();
  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Stack
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          padding={4}
        >
          <Box>
            <Typography variant="h3" sx={{ fontFamily: "Google Sans"}}>Please Register</Typography>
          </Box>

          <p style={{textAlign: 'center'}}>
            Use the settings page and enter the customers name. If you
            are testing, please use the customer name: "Googler"
          </p>
          
          <Box>
            <Button variant="contained" fullWidth onClick={() => nav("/settings")}>Register Here</Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

const Overview = () => {
  const { config } = useContext(ConfigurationContext);

  return (
    <Container maxWidth="md">
      <GeminiLogo />
      {config && config.customerName !== "" ? (
        <RegisteredBody config={config} />
      ) : (
        <PleaseRegister />
      )}
    </Container>
  );
};

export default Overview;
