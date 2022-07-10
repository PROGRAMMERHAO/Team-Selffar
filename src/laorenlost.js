import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import CardContent from '@mui/material/CardContent';
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import CallIcon from '@mui/icons-material/Call';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import DisplayMapClass from "./caregiverlaorenmap.js";
// import Map from "./map";

// Elderly reporting themselves lost
function LaoRenLost() {
    const [address, setAddress] = useState();
    const [loading, setLoading] = useState(true);
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [alertedCaregiver, setAlertedCaregiver] = useState(false);
    const [bringHome, setBringHome] = useState(false);
    const [open, setOpen] = React.useState(false);

    const caregiverName = "Tan Ah Li";
    const caregiverPhone = "94723123";
    const caregiverLocation = ["1.3521","103.8198"];

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLat(position.coords.latitude);
            setLng(position.coords.longitude);
            if(position.coords.latitude && position.coords.longitude && !address) {
                fetch(`https://discover.search.hereapi.com/v1/discover?`
                    +`q=${position.coords.latitude},${position.coords.longitude }&`
                    +`at=1.3521,103.8198&in=countryCode:SGP`
                    +`&apiKey=${process.env.REACT_APP_HERE_API_KEY}`)
                .then((res) => res.json())
                .then((data) => {
                    setAddress(data);
                })
                .then(() => setLoading(false));
            } else {
                setLoading(false);
            }
        })
    });

    function calculateCaregiverLocation() {
        return "11";
    }

    const locationAccessAllowed = address;

    const displayLocationAccessError = (
        <div>
            <h4>Sorry, We're having some trouble accessing your location. Have you enabled location access?</h4>            
        </div>
    )

    const displayLocation = () => {
        return(
            <Card>
                <CardHeader></CardHeader>
                <CardContent>
                    <h2>Are you lost?</h2>
                    <h4>You are at {address.items[0].title} (Block: {address.items[0].address.houseNumber})</h4>
                    <h4>Area: {address.items[0].address.district}</h4>
                    <Button variant="outlined" onClick={() => setAlertedCaregiver(true)}>
                        Alert my caregiver {caregiverName} ({caregiverPhone})
                    </Button>
                    <Button variant="outlined" onClick={() => setBringHome(true)} style={{marginLeft: "10px"}}>
                        Bring Me Home
                    </Button>
                </CardContent>
            </Card>
        );
    };

    const displayAlerted = () => {
        const otw = () => {
            return (
                <>
                    <h2>Please stay put, your caregiver {caregiverName} is on the way!</h2>
                    <Button variant="contained" startIcon={<CallIcon/>} onClick={handleClickOpen}>Call {caregiverName}</Button>
                    <Dialog maxWidth={true} open={open} onClose={handleClose}>
                        <DialogTitle>Calling {caregiverName} ({caregiverPhone})...</DialogTitle>
                        <DialogContent>
                        <DialogContentText>
                            Hello!
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                    </Dialog>
                    <DisplayMapClass lati={lat} longi={lng}/>
                </>
            );
        }

        const nototw = (
            <>
                <h2>We have alerted your caregiver {caregiverName}!</h2>
            </>
        )

        return(
            <Card>
                <CardHeader></CardHeader>
                <CardContent>
                    {
                        caregiverLocation
                        ? otw()
                        : nototw()
                    }
                </CardContent>
            </Card>
        );
    };

    const displayBringHome = () => {
        return (
            <>
                <h2>Leading you home!</h2>
                <Button variant="contained" startIcon={<CallIcon/>} onClick={handleClickOpen}>Call {caregiverName}</Button>
                <Dialog maxWidth={true} open={open} onClose={handleClose}>
                    <DialogTitle>Calling {caregiverName} ({caregiverPhone})...</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Hello!
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>
                <DisplayMapClass lati={lat} longi={lng}/>
            </>
        );
    };

    return (
      <div style={{marginTop: "100px"}}>
          {
            loading
              ? <CircularProgress/>
              : alertedCaregiver
                ? displayAlerted()
                : bringHome
                    ? displayBringHome()
                    : locationAccessAllowed
                        ? displayLocation() 
                        : displayLocationAccessError
          }
      </div>
    );
}

export default LaoRenLost;