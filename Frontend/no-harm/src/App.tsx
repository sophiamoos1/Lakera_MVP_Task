import React, {useState} from 'react';
import './App.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextModeration from "./TextModeration";
import LatencyTest from "./LatencyTest";

function App() {
    const [loading, setLoading] = useState(false);

    return (
    <div>
        <Box sx={{width: "100vw", height: "100vh", bgcolor: "#1c1c1c", position: "fixed"}}>
        <Box sx={{width: "100vw", height: "20vh", pl: "40vw", pt: "2vh"}}>
            <Typography variant="h1" gutterBottom sx={{fontWeight: "800", fontSize: "28px", color: "#fff"}}>
                NO HARM
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{fontWeight: "500", fontSize: "22px", color: "#fff"}}>
                Check your input with KoalaAI!
            </Typography>
        </Box>
        <Box sx={{width: "100vw", height: "80vh"}}>
            <Grid container spacing={2}>
                <Grid size={6}>
                    <TextModeration loading={loading} setLoading={(state: boolean) => setLoading(state)} />
                </Grid>
                <Grid size={6}>
                    <LatencyTest loading={loading} setLoading={(state: boolean) => setLoading(state)} />
                </Grid>
            </Grid>
        </Box>
        </Box>
    </div>
  );
}

export default App;
