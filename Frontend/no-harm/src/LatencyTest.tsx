import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    TableContainer,
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from '@mui/material';
import React, {useState, useEffect} from 'react';
import {basePhrases} from "./BasePhrases";
import {moderateWithTiming} from "./APIService";

type Props = {
    loading: boolean;
    setLoading: Function;
}

interface LatencyResults {
    min: number;
    max: number;
    avg: number;
    total: number;
    requestsCount: number;
}

export default function LatencyTest(props: Props) {
    const [textCount, setTextCount] = useState(0);
    const [loading, setLoading] = useState(props.loading);
    const [generatedPhrases, setGeneratedPhrases] = useState<string[]>([]);
    const [latencyResults, setLatencyResults] = useState<LatencyResults | null>(null);

    useEffect(() => {
        props.setLoading(loading)
    }, [loading])

    const getRandomPhrases = (count: number): string[] =>  {
        const shuffledPhrases = [...basePhrases].sort(() => 0.5 - Math.random());
        return shuffledPhrases.slice(0, count);
    }

    const handleGeneratePhrase = () => {
        if (textCount <= 0) return;
        const phrases = getRandomPhrases(textCount)
        setGeneratedPhrases(phrases)
    }

    const runLatencyTest = async () => {
        setLoading(true);
        setLatencyResults(null);
        handleGeneratePhrase()

        const durations: number[] = [];
        const startAllRequests = performance.now();
        for (let requestCount = 0; requestCount < textCount; requestCount++) {
            try {
                const randomPhrase = generatedPhrases[requestCount]
                const result = await moderateWithTiming(randomPhrase);
                durations.push(result.durationMs)
            } catch {
                durations.push(0) // Handling the case of an error-response
            }
        }

        const endAllRequests = performance.now();
        const min = Math.min(...durations);
        const max = Math.max(...durations);
        const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
        const total = endAllRequests - startAllRequests;

        setLatencyResults({
            min: +min.toFixed(2),
            max: +max.toFixed(2),
            avg: +avg.toFixed(2),
            total: +total.toFixed(2),
            requestsCount: textCount
        });
        setTextCount(0);
        setLoading(false);
    }

    return (
        <Box>
            <Paper sx={{minWidth: "30vw", minHeight: "60vh", bgcolor: "#f5dae0", mr: "2vw"}}>
                <Grid container sx={{ml: "12px", mr: "12px"}}>
                    <Grid size={12}>
                        <Typography variant="subtitle1" gutterBottom sx={{fontWeight: "700", fontSize: "20px", color: "#4d162a"}}>
                            Batch Test with Multiple Texts!
                        </Typography>
                        <Typography gutterBottom sx={{fontWeight: "500", fontSize: "18px", color: "#000"}}>
                            Enter the number of texts you want KoalaAI to review to test response time.
                        </Typography>
                    </Grid>
                    <Grid size={6} sx={{mt: "22px"}}>
                        <TextField
                            id="textCount-input"
                            label="Enter a number"
                            type="number"
                            disabled={loading}
                            value={textCount}
                            inputProps={{ min: 0 }}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const value = parseInt(event.target.value, 10);
                                if (!isNaN(value) && value >= 0) {
                                    setTextCount(value);
                                } else {
                                    setTextCount(0);
                                }
                            }}
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                            sx={{maxHeight: "7vh"}}
                        />
                    </Grid>
                    <Grid size={6} sx={{mt: "22px"}}>
                        <Button
                            variant="contained"
                            sx={{height: "6vh", bgcolor: "#4d162a"}}
                            disabled={loading || textCount === 0}
                            onClick={runLatencyTest}
                        >
                            Test response time
                        </Button>
                    </Grid>
                    <Grid size={12}>
                        <Box sx={{width: "90%", mt: "22px"}}>
                            {latencyResults && (
                                <Box>
                                    <Typography variant="subtitle2" gutterBottom sx={{fontWeight: "700", fontSize: "16px", color: "#4d162a"}}>
                                        {latencyResults.requestsCount} phrases gave us following results:
                                    </Typography>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="latency results table">
                                            <TableBody>
                                                <TableRow hover tabIndex={-1} key={"min"}>
                                                    <TableCell key={"lable"}>Shortest request time</TableCell>
                                                    <TableCell key={"duration"}>{latencyResults!.min}ms</TableCell>
                                                </TableRow>
                                                <TableRow hover tabIndex={-1} key={"max"}>
                                                    <TableCell key={"lable"}>Longest request time</TableCell>
                                                    <TableCell key={"duration"}>{latencyResults!.max}ms</TableCell>
                                                </TableRow>
                                                <TableRow hover tabIndex={-1} key={"avg"}>
                                                    <TableCell key={"lable"}>Average request time</TableCell>
                                                    <TableCell key={"duration"}>{latencyResults!.avg}ms</TableCell>
                                                </TableRow>
                                                <TableRow hover tabIndex={-1} key={"total"}>
                                                    <TableCell key={"lable"}>Total request time</TableCell>
                                                    <TableCell key={"duration"}>{latencyResults!.total}ms</TableCell>
                                                </TableRow>
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