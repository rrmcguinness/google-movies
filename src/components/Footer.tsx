import { Box, Container, Typography } from "@mui/material"

const Footer = () => {
  return(
    <Box component="footer" sx={{
      position: 'absolute',
      bottom: 0,
      height: '3.5em', 
      width: '100vw',
      backgroundColor: '#FFFFFF',
      zIndex: 999,
      borderTop: '0.5px solid #AAA',
      alignContent: 'center'}} >
      <Container maxWidth="xl">
        <Typography variant="body2" sx={{display: 'inline', pr: 5}}>&copy;2024 Google LLC</Typography>
        <Typography variant="body2" sx={{display: 'inline'}}><a href="#">About Google</a> | <a href="#">Google Cloud Terms</a></Typography>
      </Container>
    </Box>
  )
}

export default Footer