import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function CustomDialog() {
  const [open, setOpen] = React.useState(false);
  const caregiverName = "dummy caregiver";
  const caregiverPhone="999";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <>
        <Button variant="outlined" onClick={handleClickOpen}>
            Alert my caregiver {caregiverName}
        </Button>
        <Dialog
            fullWidth={false}
            maxWidth={true}
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>We have called {caregiverName} ({caregiverPhone})</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Your caregiver is on the way!
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
      </>
  );
}