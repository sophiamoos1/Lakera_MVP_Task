import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {moderateText, ModerationResult} from "./APIService";

type Props = {
    loading: boolean;
    setLoading: Function;
}
export default function TextModeration(props: Props) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(props.loading);
    const [moderateResult, setModerateResult] = useState<ModerationResult | null>(null);

    useEffect(() => {
        props.setLoading(loading)
    }, [loading])

    const handleModerate = async () => {
        setLoading(true);
        try {
            const res = await moderateText(text);
            setModerateResult(res);
            setText("");
        } catch (err) {
            alert("Error while moderation");
        }
        setLoading(false);
    };

    return (
        <Box>
            <Paper sx={{minWidth: "30vw", minHeight: "80vh", bgcolor: "#dedaf5", ml: "2vw"}}>
                <Grid container sx={{ml: "12px", mr: "12px"}}>
                    <Grid size={12}>
                        <Typography variant="subtitle1" gutterBottom sx={{fontWeight: "700", fontSize: "20px", color: "#1c164d"}}>
                            Submit a Text for KoalaAI Review!
                        </Typography>
                        <Typography gutterBottom sx={{fontWeight: "500", fontSize: "18px", color: "#000"}}>
                            Enter any text you'd like KoalaAI to analyze for content moderation.
                        </Typography>
                    </Grid>
                    <Grid size={6} sx={{mt: "22px"}}>
                        <TextField
                            id="text-input"
                            label="Enter Text"
                            multiline
                            disabled={loading}
                            maxRows={4}
                            value={text}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setText(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid size={6} sx={{mt: "22px"}}>
                        <Button
                            variant="contained"
                            disabled={loading}
                            sx={{height: "6vh", bgcolor: "#1c164d"}}
                            onClick={handleModerate}
                        >
                            Analyse Text
                        </Button>
                    </Grid>
                    <Grid size={12}>
                        <Box sx={{width: "90%", mt: "22px"}}>
                            {moderateResult && (
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom sx={{fontWeight: "700", fontSize: "16px", color: "#1c164d"}}>
                                        "{moderateResult?.text}" gave us following results:
                                    </Typography>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="results table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell key={"category"}>Category</TableCell>
                                                    <TableCell key={"score"}>Score</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {moderateResult!.scores.map((moderationCategory) => (
                                                    <TableRow hover tabIndex={-1} key={moderationCategory.category}>
                                                        <TableCell key={"category"}>{moderationCategory.category}</TableCell>
                                                        <TableCell key={"score"}>{(moderationCategory.score * 100).toFixed(2)}%</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}