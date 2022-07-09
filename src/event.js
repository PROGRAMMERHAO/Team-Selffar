import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));


export default function Events() {
const [users, setUsers] = useState();
const user = {
    name: "wenjun"
  };
    useEffect(()=>{
        let config = {
            headers: {
              uid: "hello",
            }
          }
          
          let data = {
            'HTTP_CONTENT_LANGUAGE': "wenjun"
          }
          
        axios.post(`https://asia-southeast1-rhapp-bcb98.cloudfunctions.net/user`, data, config).then(res => {
            const persons = res.data;
           console.log(persons);
          })
        axios.get(`https://asia-southeast1-rhapp-bcb98.cloudfunctions.net/user`)
        .then(res => {
          const persons = res.data;
         console.log(persons);
        })
       
        

       
    },[])
    return (
       
        <div 
        style={
            {  position:"absolute",
                left:"250px"}
        }>
        <h2 style={{paddingTop:"-10px"}}>What's Happening</h2>
       
        <Grid
        container
        style={{paddingTop:"70px", paddingLeft:"20px"}}
      
        spacing={4}
      >
      
       <Grid   xs={4} sm={6} md={3}>
        
        <Card>
        <CardContent>
          <Typography variant="h5" component="div">
           Medicine in Dementia Care
          </Typography>
          <Typography variant="body2">
          This course teaches the caregivers about some common medicine used to treat dementia
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    
      </Grid>
      <Grid xs={4} sm={6} md={3}>
       
      <Card >
        <CardContent>
          <Typography variant="h5" component="div">
           Daily Dementia Care
          </Typography>
          <Typography variant="body2">
          This course teaches the caregivers about common practices to improve the care quailty for people with dementia
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      </Grid> 
      <Grid xs={4} sm={6} md={3}>
      <Card >
        <CardContent>
          <Typography variant="h5" component="div">
           Talking in Dementia Care
          </Typography>
          <Typography variant="body2">
          This course teaches the caregivers how to communicate with patients in the most effective way
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
      </Grid>
      </Grid>
     
      </div>
    )
}