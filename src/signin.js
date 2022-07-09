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
import { Link, Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";

const theme = createTheme();
export function Signin() {
 
  let navigate = useNavigate();
  const { signInWithGoogle } = useAuth();
  const { signin } = useAuth();
  const [username, setName] = useState("");
  const [password, setPassword] = useState(null);
  const handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.username] = input.value;

    this.setState({ data, errors });
  };

  

  return (
    <div style={{ 
      height: 800,
      backgroundSize: 'cover',
      backgroundImage: `url(https://lh3.googleusercontent.com/7Mj8GxJriwbThmO4rN7JIb4N3KQLXhYuPYr58Js-7cV0h3TFRmmxjZbRg4ZQ1ZAvhUT8zCUvlI85tLSwNyYZldiiTAoSxCxd7sUo9SOF2z5z8NSbNNS7OTAVTOOC8TR9a_g-sCNqcZHLTLoCxizAOk7_dGbvbdMzywJ7dbjydi8rx1hvv1mnVpK7tmh9SD7VqA21IPC4v2R2jHnBnmyBNUmuwywCbV4irOLepDcEYqRo6DBOfhukuASdcRuPqFdUD7Qeksx-CmFNmohFVSYkkEeuRk0S6ZIAsV2m5uxKMImGRocA5U_U2NFY0mbLuLDm-d8X5EGbolEwqejKx-JjJUMFvZRu47DVo-ZY2WT2J07SpAjDyOYp3g02vhNEUOtTpbQuPARb93gH45O-ndoUVkrXJELErQBdBNhO_2C57V2mKCf5UKsLCtiI20wF1u7VjNzAHGH62ArSYwK7ZD4RdtTfAa52U-xj9mQwsPT3kW-sQpIziWSpAXNOOJfpjmrLPEPm5PMc7pBT4JBKdgb-X_5IzALHPhvp3iugQmh-C_GKGuakj3-ZFCil_51cMVkD8awCcSTx-nYfK-sgIUaRARpndnnY0o32ZkYDYN8UDmIOuErmeoJFEvAyPlrblgCWXVDCPPcwOtxAqU7g96CkC8v0JPWbCzU-SWCxW6R5L_V_cpZZ2h3GiZg1ClqzosuBzHS4J8Z8DKaw5KyGf52kgKPOWo82VI8NCrRpjw8xbmII06DcaccYRtNvfWQNXg=w1734-h925-no?authuser=0)` }}>
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
          <Box
            component="form"
            onSubmit={(e) => {signin(e, username, password);navigate("/")}}
            noValidate
            sx={{ mt: 1 }}
          >
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
        <Button onClick={()=>navigate("/signup")}>Caregiver Register</Button>
        <Button onClick={()=>navigate("/patientsignup")}>Patient Register</Button>
        
      </Container>
    </ThemeProvider>
    </div>
    
  );
}
export default function SignInUser() {
  return <Signin></Signin>;
}
