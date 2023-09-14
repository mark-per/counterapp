import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {lg:"18vw", md:"25vw",sm:"40vw", xs:"70vw"},
    height:{lg:"25vh", md:"30vh",sm:"30vh", xs:"30vh"},
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',             // Add display: 'flex'
    flexDirection: 'column',     // To stack items vertically
    alignItems: 'center',        // Center items horizontally
    justifyContent: 'center',   // Center items vertically
};

const RenderCounters = () => {
    const [counters, setCounters] = useState([]);
    const [serverError, setServerError] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [errorMssg, setErrrorMssg] = useState("Internal Server Error");
    const [open, setOpen] = useState(false);
    const [counterName, setCounterName] = useState("");
    const [counterCount, setCounterCount] = useState(0);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setCounterName('');
        setCounterCount(0);
        setOpen(false);
    }

    const retrieveCounters = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/counters", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors',
            })

            const parsedRes = await response.json()

            if (response.ok) {
                if (parsedRes.length > 0) {
                    setCounters(parsedRes)
                }
            } else {
                setServerError(true)
            }
        } catch (err) {
            setServerError(true)
        }
    }

    useEffect(() => {
        retrieveCounters();
    }, [])

    const handleOnSubmit = async () => {
        if (counterCount != null && counterName.length > 0) {
            const response = await fetch("http://localhost:9090/api/counters", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors',
                body: JSON.stringify({
                    name: counterName,
                    count: counterCount
                })
            })

            setCounterName('');
            setCounterCount(0);
            handleClose()

            const parsedResponse = await response.text();
            retrieveCounters();
            if (response.ok) {
                return;
            } else {
                setServerError(true);
            }
        } else {
            setSubmitError(true);
        }
    }

    const handleOnIncrement = async (id) => {
        const response = await fetch(`http://localhost:9090/api/counters/${id}/increment`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'cors',
        })

        const parsedResponse = await response.text();
        retrieveCounters();
        if (response.ok) {
            return;
        } else {
            setServerError(true);
        }
    }

    const handleOnDecrement = async (id) => {
        const response = await fetch(`http://localhost:9090/api/counters/${id}/decrement`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'cors',
        })

        const parsedResponse = await response.text();
        retrieveCounters();
        if (response.ok) {
            return;
        } else {
            setServerError(true);
        }
    }

    const handleOnDelete = async (id) => {
        const response = await fetch(`http://localhost:9090/api/counters/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            mode: 'cors',
        })

        const parsedResponse = await response.text();
        retrieveCounters();
        if (response.ok) {
            return;
        } else {
            setServerError(true);
        }
    }

    return (
        <Box sx={{ width: "90vw" ,height:{lg:"100vh", md:"100vh", sm:"100vh", xs:"120vh"}, bgcolor: '#CEDEBD'}}>
            <Grid container justifyContent="center" spacing={2}>
                {counters.map((counter) => (
                    <Grid item xs={10} sm={4} md={3} lg={2} key={counter.id} container justifyContent="center">
                        <Card sx={{bgcolor: '#9EB384', mt: 10, boxShadow: 8, height: "170px", width: "290px",}}>
                            <CardHeader
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    '& .MuiCardHeader-title': {
                                        fontSize: '20px', // Adjust the font size as desired
                                    },
                                    bgcolor: '#435334'
                                }}
                                avatar={
                                    <Avatar sx={{
                                        bgcolor: '#9EB384',
                                        color: 'black',
                                        fontSize: '15px',
                                        width: '30px',
                                        height: '30px'
                                    }}>
                                        {counter.id}
                                    </Avatar>
                                }
                                action={
                                    <IconButton sx={{fontSize: '24px', color: '#952323'}}>
                                        <DeleteIcon onClick={()=>handleOnDelete(counter.id)}/>
                                    </IconButton>
                                }
                                title={counter.name}
                            />
                            <CardContent sx={{p: 1}}>
                                <Typography sx={{pt: 1, fontSize: 22, display: 'flex', justifyContent: 'center'}}>
                                    {counter.count}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{fontSize: 15, display: 'flex', justifyContent: 'space-between'}}>
                                <IconButton sx={{fontSize: '24px', color: '#BB2525'}}>
                                    <RemoveIcon onClick={()=>handleOnDecrement(counter.id)}/>
                                </IconButton>
                                <IconButton sx={{fontSize: '24px', color: '#102C57'}}>
                                    <AddIcon onClick={()=>handleOnIncrement(counter.id)}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Box height="170px" width="150px" mt={10} ml={5} display="flex" justifyContent="center" flexDirection="column">
                    <IconButton sx={{}}>
                        <AddIcon sx={{fontSize: "80px"}} onClick={handleOpen}/>
                    </IconButton>
                    <Typography variant="h5">
                        Add Counter
                    </Typography>
                </Box>
            </Grid>

            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Typography id="keep-mounted-modal-title" variant="h6" component="h2" mb={2}>
                        Add Counter
                    </Typography>
                    <TextField
                        onChange={(e) => setCounterName(e.target.value)}
                        value={counterName}
                        id="outlined-basic"
                        label="Counter Name"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        onChange={(e) => setCounterCount(e.target.value)}
                        value={counterCount}
                        id="outlined-basic"
                        label="Counter Count"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button onClick={handleOnSubmit} variant="contained">
                            Submit
                        </Button>
                        <Button sx={{ ml: 5.5 }} onClick={handleClose} variant="contained">
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Box>
    )
}

export default RenderCounters;