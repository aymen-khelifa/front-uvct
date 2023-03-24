import React from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
function SnackbarErr(props) {
    const [setOpen2] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen2(false);
      };
  return (
    <Snackbar open2={props.open2} autoHideDuration={6000} onClose={handleClose} 
       anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error">
          {props.err}
        </Alert>
      </Snackbar>
  )
}

export default SnackbarErr