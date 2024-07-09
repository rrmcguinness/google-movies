import { Backdrop } from "@mui/material"
import loader from "../assets/loader.webp"

const GBackdrop = ({backdrop, setBackdrop}: {backdrop: boolean, setBackdrop: (value: boolean) => void}) => {
    
    const clearBackdrop = () => {
        setBackdrop(false)
    }
    
    return(
    <Backdrop 
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
        onClick={() => setTimeout(clearBackdrop, 2000)}>
        <img src={loader} style={{maxWidth: '150px', borderRadius: '100px'}} />
    </Backdrop>
    )
}

export default GBackdrop