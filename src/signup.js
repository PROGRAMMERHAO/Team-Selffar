import { useState } from "react";
import { useAuth } from "./useAuth";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

//import { useAuthState } from "react-firebase-hooks/auth";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";


const theme = createTheme();
const Submit = () => {
  //const { registerWithEmailAndPassword } = useAuth();
  //const { signInWithGoogle } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [patientname, setPatientname] = useState("")
  const [patientnumber, setPatientnumber] = useState("")
  const [username, setName] = useState("");
  const [loginerror, setError] = useState("");
  const [password, setPassword] = useState(null);
  const [retypepassword, setRetypepassword] = useState(null);

  //let navigate = useNavigate();
  // const register = (e) => {
  // e.preventDefault();
  //if (!username) alert("Please enter name");
  //registerWithEmailAndPassword(fullname, username, password);
  //};
  async function register (event) {

    event.preventDefault();
   
    if (firstName==="") {
      return alert("Please enter a full name");
    }
 
else if (username==="") {
  alert("please enter an email")
}
    else if(password!==retypepassword) {
      alert("passwords do not match")
    }
   
    else{
    
  /* await registerWithEmailAndPassword(firstName+" "+lastName, username, password)
      .then((userAuth) => {
        // Update the newly created user with a display name and a picture
        updateProfile(userAuth.user, {
          displayName: firstName+" "+lastName,
        })
          .catch((error) => {
            console.log(error);
            setError(error);
          });
      })
      .catch((err) => {
        alert(err);
      });*/
  // navigate("/");
    
    
    }
    
  };
    
  

  return (
    <div 
    style={{ 
      backgroundImage: `url(https://lh3.googleusercontent.com/E-QN3KcK41c8MrYS-AabtEEOW8GDaJIgsGvMny03oLIJ20-uyRq-p77i_7b3YOlKysxQo4p_qLjCL4u9E5KYDZFVioU58xavY5GPfuXOye_K3FEd-N3oPsQWcjyi6hmssWIDUd2C-XOuDp2BIk_Gldp6YayTkwfy6kEpFX3Rbf2Qoli0JI2muvHInBnCcepriGYkG841G69BprT1rwH2oDBIzpXrHxPz0Nel52JvfxW-wB11MJ8i99SJBBbFKJyiTCqknMCfcQo4pInrWXiXuyX9rus99_ddr5iPNfku0NP77cwRH8rveInO49kAJJt7gdMu0zsa739heYInhjAzHrzkrG-tqRgv-dOUl-rbplyHM6ZfDbIzKbFJIPoc38r5k-kx9dGc9xx8hBai2ttufFeMhE72LG6zmgpvtuqa9BCBSUZo312xFjV8KPjRlCF3mA95TmgHvLnlO_WBIEZhreyhgHUTeoia-T9c5obW5C2-mvd1hMoEjU3RUB4XBkH9KvdXlSx27k-ucVAMU8FNeMPcO0Cy1RLeql7ieyHv2KwqV-e-tkbFdAbxXjNeqJGX8GBcfa3AUahdC1h9SK2ghKE65teLQf1uQxcxxNKsDm07pIm8HqCfpD9sBWHScIj4waVVVId_5Rb1AHORz9U0QQGmuG_EsxGWQ0jwFp7X2AY4jsLYUYgxjaGyJ7TeROb-Mn69u2kurh3wAX9mRwDuecvWvrGRgjXN8ocIeXOFl3RztZ6ozoHevFDP6i2g4g=w1495-h940-no?authuser=0)` }}>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={(e)=>{register(e);}} noValidate sx={{ mt: 1 }}>
            <TextField
              value={firstName}
              margin="normal"
              required
              fullWidth
              name="firstname"
              label="Firstname"
              id="firstname"
              autoComplete="firstname"
              onChange={(e) => setFirstName(e.target.value)}
            />
             <TextField
              value={lastName}
              margin="normal"
              required
              fullWidth
              name="lastname"
              label="Lastname"
              id="lastname"
              autoComplete="lastname"
              onChange={(e) => setLastName(e.target.value)}
            />

            <TextField
              value={username}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />

           <TextField
              value={location}
              margin="normal"
              required
              fullWidth
              id="location"
              label="Meeting Location"
              name="location"
              autoComplete="location"
              autoFocus
              onChange={(e) => setLocation(e.target.value)}
            />
             <TextField
              value={contact}
              margin="normal"
              required
              fullWidth
              id="contact"
              label="Caretaker's Number"
              name="contact"
              autoComplete="contact"
              autoFocus
              onChange={(e) => setContact(e.target.value)}
            />
            <TextField
              value={patientname}
              margin="normal"
              required
              fullWidth
              id="patientname"
              label="Patient's Name"
              name="patientname"
              autoComplete="patientname"
              autoFocus
              onChange={(e) => setPatientname(e.target.value)}
            />
               <TextField
              value={patientnumber}
              margin="normal"
              required
              fullWidth
              id="patientnumber"
              label="Patient's Number"
              name="patientnumber"
              autoComplete="patientnumber"
              autoFocus
              onChange={(e) => setPatientnumber(e.target.value)}
            />
         
            <TextField
              value={password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              value={retypepassword}
              margin="normal"
              required
              fullWidth
              name="retypepassword"
              label="Re-enter Password"
              type="password"
              id="retypepassword"
              autoComplete="current-password"
              onChange={(e) => setRetypepassword(e.target.value)}
            />
            <Typography component="h3" variant="h5">
            {loginerror}
          </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  );
};

export default function Signup() {
  return <Submit></Submit>;
}
