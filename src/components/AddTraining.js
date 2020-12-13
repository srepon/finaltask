import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddTraining(props) {
    const [training, setTraining] = useState({ 
        date: '', 
        duration: '', 
        activity: '', 
        customer: ''
        })
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
      console.log(training);
      props.addTraining(training);
      handleClose();
    }

    const inputChanged = (event) => {
      setTraining({...training, 
        [event.target.name]: event.target.value, 
        customer: props.params.value[0].href})
    }    

    return(
      <div>
        <Button size="small" style={{ margin: 10 }} variant="outlined" color="primary" onClick={handleClickOpen}>
          Add training
        </Button>
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle >New training</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Date"
            name="date"
            value={training.date}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Activity"
            name="activity"
            value={training.activity}
            onChange={inputChanged}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Duration"
            name="duration"
            value={training.duration}
            onChange={inputChanged}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>   
    )
}

export default AddTraining;