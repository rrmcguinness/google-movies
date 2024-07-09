import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ConfigurationContext from "../context/ConfigContext"
import { useContext } from "react"

const Header = () => {
  const {config} = useContext(ConfigurationContext)
  const nav = useNavigate()
  return(
    <Box component={'nav'}>
      <AppBar position="sticky" color="transparent">
        <Toolbar sx={{p: 0}}>
          <Typography variant="h4" sx={{ fontFamily: "Google Sans"}}>
            <Typography variant="inherit" component={'span'} sx={{color: '#4285F4'}}>G</Typography>
            <Typography variant="inherit" component={'span'} sx={{color: '#DB4437'}}>o</Typography>
            <Typography variant="inherit" component={'span'} sx={{color: '#F4B400'}}>o</Typography>
            <Typography variant="inherit" component={'span'} sx={{color: '#4285F4'}}>g</Typography>
            <Typography variant="inherit" component={'span'} sx={{color: '#0F9D58'}}>l</Typography>
            <Typography variant="inherit" component={'span'} sx={{color: '#DB4437'}}>e</Typography> <Typography variant="inherit" component={'span'} sx={{color: '#666666'}}>Cloud</Typography>
          </Typography>
          <Box sx={{ml: 4, flexGrow: 1, display: 'flex'}}>
            <Button sx={{my: 2, display: 'block', color: '#333333', fontFamily: "Google Sans"}} onClick={() => nav('/')}>Overview</Button>
            <Button sx={{my: 2, display: 'block', color: '#333333', fontFamily: "Google Sans"}}  onClick={() => nav('/demo/1', {replace: true})} disabled={!config || !config.customerName || config.customerName === ""}>Demo</Button>
            <Button sx={{my: 2, display: 'block', color: '#333333', fontFamily: "Google Sans"}}  onClick={() => nav('/settings', {replace: true})}>Settings</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header