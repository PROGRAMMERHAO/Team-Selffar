import { useState } from "react";
import { useAuth } from "./useAuth";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
   
 
 
 if (username==="") {
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
    
  
  /* const schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };
  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  }; */
  return (
    <div 
    style={{ 
      backgroundImage: `url(https://www.figma.com/file/H5fdm1JBgbOQOR50I9BNZF/Untitled?node-id=6%3A208)` }}>
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={(e)=>{register(e);}} noValidate sx={{ mt: 1 }}>
           
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

export default function Signin() {
  return <Submit></Submit>;
}