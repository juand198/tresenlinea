import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const {juego} = props

    const handleClose = () => {
        setOpen(!open);
    };

    return (
        <div>
        <Backdrop style={{ display:'flex',flexDirection:'column',color:'gold' }} className={classes.backdrop} open={open} onClick={handleClose}>
            <EmojiEventsIcon style={{ width:'200px',height:'200px' }} />
            <p style={{ color:'black' }}>Winner is... {juego.state.ganador}</p>
            <p>{"Por que: " + juego.state.why}</p>
        </Backdrop>
        </div>
    );
}