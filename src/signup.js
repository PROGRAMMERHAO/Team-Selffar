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
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

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
  const { registerWithEmailAndPassword } = useAuth();
  //const { signInWithGoogle } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [patientname, setPatientname] = useState("")
  const [patientnumber, setPatientnumber] = useState("")
  const [username, setName] = useState("");
  const [loginerror, setError] = useState("");
  const [password, setPassword] = useState(null);
  const [retypepassword, setRetypepassword] = useState(null);
  const [postalCodeErr, setPostalCodeErr] = useState();

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
    } else if (username==="") {
      alert("please enter an email")
    } else if (password!==retypepassword) {
      alert("passwords do not match")
    } else if (!address) {
      alert("Please ensure you have entered a correct postal code and populated the address")
    } else {
    await registerWithEmailAndPassword(firstName, lastName, username, password, address, location, contact, patientname, patientnumber)
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
        });
    // navigate("/");
      
      
      }
      
    };
  

  const validatePostalCode = () => {
      var regex = new RegExp("[0-9]{6}");
      if (regex.test(location)) {
          console.log(location);
          // 6 digit number, query api to check if actual postal code and get address
          fetch(`https://geocode.search.hereapi.com/v1/geocode?qq=postalCode=`
                  +`${location};country=Singapore&`
                  +`&apiKey=${process.env.REACT_APP_HERE_API_KEY}`)
              .then((res) => res.json())
              .then((data) => {
                  if(data.items[0]) setAddress(data.items[0].title);
                  else setPostalCodeErr("Sorry! Couldn't find this postal code.");
              });            
      } else {
        console.log("ERROR!");
        setPostalCodeErr("Invalid Postal Code (Should be 6 digits!)");
      }
  };
  

  return (
    <div 
    style={{ 
      backgroundImage: `url(https://lh3.googleusercontent.com/9RA9SLzv7IiuVzNka6Wv6mWw4E8sCCVTC7cN7LBk_vmYK6qAmA0Sh3uY8H1gl-hO5LLt--wk2YQXqcdAKSCs-AMrNnYgM5ArxJqi0V3c7V28NZXLu1s47G3iy0f2wCnRagZpB6cDFnrQrKElPBVpBiG8uv-EUtfXdLN6D6aefWY3J22E9BScRr8qKyKakkuvJbVDlAnwKFmq3JYxUNVTbYds0T9F3Ol8NZDU6J-4OzecgMIzrqNWB5yACTdj6YALQG3oRA-O-24FRMQCnyXFUs8ocx8ZkmcUpqYMPSdNaGE0aZ5fPKrukohksb40AbuCR8xqOeZ2vhfSgwzuo_qixayhT-u_v8atsfmlnfDiGrVgIZITZk2IZBrpY5Z01DBH2LMZsvOhurNsu-mm5j8U6EgATsn_kV1Zi0bh4L-HyCshbXI1B-8uHarPYUGT_ZEGRX1BNcpsTSBv_948DZzkz5qyh_SfK26GfoXAcaEorEjWsMbqn0coIylZEo7AWg2wsmVfoL4PoDkozeFThn-metStGoxU7c13U-s7UHFanEFtHzTfmQusPR4A-zw2YH-Ajxqy6feofHIq3TLKTMrL5h4Y6ruLYg9OtLaIcrg4-dRExwc3wlF-45DJMbhApSUCI3o0XcgnYCSGTB8rhg54FzduMrw_A633ZVwawuy-E4Gyz07O_Q-KMcAghAkGuzK6XkAoBQ8ai4qf2LVWJTvgde-4q870vTafXnPlZSN3ZIxUkJIIjOyF_6iDVYGRHQ=w1593-h940-no?authuser=0)` }}>
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

            <div style={{display:"flex", width: "111%", flexDirection: "row", justifySelf: "center", alignSelf: "center"}}>
              <div style={{paddingRight: "5px", alignSelf: "center"}}>
                <TextField
                  value={address}
                  id="address"
                  multiline
                  rows={4}
                  label={"Home Address"}
                  margin="normal"
                  autoFocus
                />
              </div>

              <div style={{ alignSelf: "center", alignItems: "center", display: "flex" }}>
                <TextField
                      value={location}
                      required
                      id="location"
                      label="Postal Code"
                      name="location"
                      autoFocus
                      onChange={(e) => setLocation(e.target.value)}
                      error={postalCodeErr}
                      helperText={postalCodeErr}
                      margin="normal"
                />
                <IconButton aria-label="search" style={{paddingTop: "10px", paddingLeft:"10px"}} onClick={() => validatePostalCode()}>
                  <SearchIcon />
                </IconButton>
              </div>
            </div>


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
