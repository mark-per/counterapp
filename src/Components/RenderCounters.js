import React, {useEffect, useState} from 'react';
import {
    Alert,
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
    Snackbar,
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
    width: {lg: "18vw", md: "25vw", sm: "40vw", xs: "70vw"},
    height: {lg: "25vh", md: "30vh", sm: "30vh", xs: "30vh"},
    bgcolor: 'background.paper',
    borderRadius: '10px',
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
                setCounters(parsedRes)
            }
        } catch (err) {
            setServerError(true)
            setErrrorMssg("Internal server error");
        }
    }

    useEffect(() => {
        retrieveCounters();
    }, [])

    const handleOnSubmit = async () => {
        if (counterCount != null && counterName.length > 0) {
            try {
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
                }
            } catch (err) {
                setServerError(true);
                setErrrorMssg("Internal server error");
            }
        } else {
            setSubmitError(true);
            setErrrorMssg("Please provide a name");
        }
    }

    const handleOnIncrement = async (id) => {
        try {
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
            }
        } catch (err) {
            setServerError(true);
            setErrrorMssg("Internal server error");
        }
    }

    const handleOnDecrement = async (id) => {
        try {
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
            }
        } catch (err) {
            setServerError(true);
            setErrrorMssg("Internal server error");
        }
    }

    const handleOnDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:9090/api/counters/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                mode: 'cors',
            })

            const parsedResponse = await response.text();
            if (response.ok) {
                await retrieveCounters();
                return;
            }
        } catch (err) {
            setServerError(true);
            setErrrorMssg("Internal server error");
        }
    }

    return (
        <Box sx={{width: "90vw", height: {lg: "100vh", md: "100vh", sm: "100vh", xs: "120vh"}, bgcolor: '#CEDEBD'}}>
            <Snackbar open={serverError} autoHideDuration={1500} onClose={() => setServerError(false)}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {errorMssg}
                </Alert>
            </Snackbar>
            <Snackbar open={submitError} autoHideDuration={1500} onClose={() => setSubmitError(false)}
                      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
                <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                    {errorMssg}
                </Alert>
            </Snackbar>
            <Grid container justifyContent="center" spacing={2}>
                {counters.map((counter) => (
                    <Grid item xs={10} sm={4} md={3} lg={2} key={counter.id} container justifyContent="center">
                        <Card sx={{
                            bgcolor: '#9EB384',
                            mt: 10,
                            boxShadow: 8,
                            height: "170px",
                            width: "290px",
                            borderRadius: "8px"
                        }}>
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
                                        <DeleteIcon onClick={() => handleOnDelete(counter.id)}/>
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
                                    <RemoveIcon onClick={() => handleOnDecrement(counter.id)}/>
                                </IconButton>
                                <IconButton sx={{fontSize: '24px', color: '#102C57'}}>
                                    <AddIcon onClick={() => handleOnIncrement(counter.id)}/>
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
                <Box height="170px" width="150px" mt={10} ml={5} display="flex" justifyContent="center"
                     flexDirection="column">
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
                        onChange={(e) => {
                            // Limit input to 8 characters
                            const inputValue = e.target.value.slice(0, 8);
                            setCounterName(inputValue);
                        }}
                        value={counterName}
                        id="outlined-basic"
                        label="Counter Name"
                        variant="outlined"
                        inputProps={{maxLength: 8}}
                        sx={{mb: 2}}
                    />
                    <TextField
                        onChange={(e) => {
                            // Limit input to 18 characters
                            // long can contain upto 19 characters
                            const inputValue = e.target.value.slice(0, 18);
                            setCounterCount(inputValue);
                        }}
                        value={counterCount}
                        id="outlined-basic"
                        label="Counter Count"
                        variant="outlined"
                        inputProps={{maxLength: 18}}
                        sx={{mb: 2}}
                    />
                    <div sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={handleOnSubmit} variant="contained">
                            Submit
                        </Button>
                        <Button sx={{ml: 5.5}} onClick={handleClose} variant="contained">
                            Cancel
                        </Button>
                    </div>
                </Box>
            </Modal>
        </Box>
    )
}

export default RenderCounters;