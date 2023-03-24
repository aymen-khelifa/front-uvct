import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function SnackbarSuccess(props) {
    const [setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
  return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose} 
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="success">
          {props.success}
        </Alert>
      </Snackbar>
  )
}

export default SnackbarSuccess