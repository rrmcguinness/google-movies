import { Button, Container, FormControl, FormHelperText, InputLabel, Slider, Stack, TextField, Typography } from "@mui/material"
import { useFormik } from "formik"
import React, { useContext } from "react"
import ConfigurationContext from "../context/ConfigContext"
import { useNavigate } from "react-router-dom"
import { Config } from "../model/config"

const Settings = () => {
  const {config, setConfig} = useContext(ConfigurationContext)
  const nav = useNavigate()
  const formik = useFormik<Config>({
    initialValues: config,
    onSubmit: async (values: Config) => {
      console.log("Saving Config");
      console.log(values.customerName)
      setConfig({...config, ...values})
      nav("/overview", {replace: true})
    }
  })

  return(
    <React.Fragment>
      <Typography variant="h5">Settings</Typography>
      <Container maxWidth="md">
      <form method="post" onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <Typography variant="h5">Demo Information</Typography>
          <TextField
            fullWidth
            label="Customer Name" 
            variant="outlined"
            name="customerName"
            helperText={'Use "Googler" if you are only testing'}
            value={formik.values.customerName}
            error={formik.touched.customerName && Boolean(formik.errors.customerName)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

          <TextField 
            fullWidth
            label="Engineer LDAP" 
            variant="outlined" 
            name="engineerLdap"
            helperText={'Displayed as "Presented By: <name>"'}
            value={formik.values.engineerLdap}
            error={formik.touched.engineerLdap && Boolean(formik.errors.engineerLdap)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur} />

          <TextField
            fullWidth
            name="generativeConfig.genAIToken"
            type="password"
            label="Generative AI Token" 
            variant="outlined" 
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.generativeConfig.genAIToken} />
        
          <Typography variant="h5">Generative AI Settings</Typography>

          <TextField
            label="Instructions"
            name="generativeConfig.instructions"
            multiline
            rows={3}
            error={formik.touched.generativeConfig?.instructions && Boolean(formik.errors.generativeConfig?.instructions)}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.generativeConfig?.instructions}/>

          <FormControl fullWidth variant="outlined" sx={{mt:2}}>
            <InputLabel
              shrink={true}
              htmlFor="config-temp" >Temperature</InputLabel>
            <Slider
              id="config-temp"
              name="generativeConfig.temperature"
              aria-describedby="config-temp-helper"
              size="medium"
              value={formik.values.generativeConfig.temperature}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              step={0.1}
              valueLabelDisplay="auto"
              marks
              min={0.0}
              max={1.0} />
            <FormHelperText id="config-temp-helper">The temperature is used for sampling during response generation, which occurs when topP and topK are applied. Temperature controls the degree of randomness in token selection. Lower temperatures are good for prompts that require a less open-ended or creative response, while higher temperatures can lead to more diverse or creative results. A temperature of 0 means that the highest probability tokens are always selected. In this case, responses for a given prompt are mostly deterministic, but a small amount of variation is still possible.</FormHelperText>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{mt:2}}>
            <InputLabel
              shrink={true}
              htmlFor="config-top-p">Top P</InputLabel>
            <Slider
              id="config-top-p"
              name="generativeConfig.topP"
              aria-describedby="config-top-p-helper"
              size="medium"
              value={formik.values.generativeConfig.topP}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              step={0.01}
              valueLabelDisplay="auto"
              marks
              min={0.0}
              max={1.0} />
            <FormHelperText id="config-top-p-helper">Top-P changes how the model selects tokens for output. Tokens are selected from the most (see top-K) to least probable until the sum of their probabilities equals the top-P value. For example, if tokens A, B, and C have a probability of 0.3, 0.2, and 0.1 and the top-P value is 0.5, then the model will select either A or B as the next token by using temperature and excludes C as a candidate.</FormHelperText>
          </FormControl>

          <FormControl fullWidth variant="outlined" sx={{mt:2}}>
            <InputLabel
              shrink={true}
              htmlFor="config-top-k">Top K</InputLabel>
            <Slider
              id="config-top-k"
              name="generativeConfig.topK"
              aria-describedby="config-top-k-helper"
              size="medium"
              value={formik.values.generativeConfig.topK}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              step={1}
              valueLabelDisplay="auto"
              marks
              min={1}
              max={40} />
            <FormHelperText id="config-top-k-helper">Top-K changes how the model selects tokens for output. A top-K of 1 means the next selected token is the most probable among all tokens in the model's vocabulary (also called greedy decoding), while a top-K of 3 means that the next token is selected from among the three most probable tokens by using temperature.</FormHelperText>
          </FormControl>

          <Typography variant="h5">Prompt Settings</Typography>

          <TextField
            name="promptDetectCategories"
            label="Detect Category"
            multiline
            rows={3}
            value={config.promptDetectCategories} />

          <TextField
            label="Extract Product Detail"
            name="promptExtractProductDetail"
            multiline
            rows={3}
            value={formik.values.promptExtractProductDetail} />

          <TextField
            name="promptTranslateProductDetail"
            label="Translate Product Detail"
            multiline
            rows={3}
            value={config.promptTranslateProductDetail} />

          

          <Button type="submit">Save</Button>
          </Stack>
      </form>
      </Container>
    </React.Fragment>
  )
}

export default Settings