import "../css/WarningCard.css";
import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

const generateText = (name, direction) => {
  if (direction === "LEFT") {
    return `Lead ${name} to the pickup point (10 min)`;
  }
  return `Leave ${name} somewhere safe.`;
};

const WarningCardButton = ({ name, direction }) => {
  return (
    <Button color='primary' fullWidth={true} size='medium' variant='outlined'>
      {generateText(name, direction)}
    </Button>
  );
};

const WarningCard = ({ name }) => {
  return (
    <Card variant='outlined' sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant='h5' gutterBottom align='center'>
          {name} needs your help.
        </Typography>
        <Typography variant='body2' align='left' paragraph={true}>
          {name} is a patient suffering from dementia and he needs your help to get
          home safely. His caregiver has been notified and is on his way. Select one
          of the options
        </Typography>
        <div id='card-buttons'>
          <WarningCardButton direction='LEFT' name={name} />
          <WarningCardButton direction='RIGHT' name={name} />
        </div>
      </CardContent>
    </Card>
  );
};

WarningCard.defaultProps = {
  name: "Placeholder",
};

export default WarningCard;
