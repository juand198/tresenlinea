import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default function SimpleBackdrop(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const {juego,iniciar} = props

    const [nombre1, setnombre1] = React.useState("")
    const [nombre2, setnombre2] = React.useState("")

    function jugar(){
        juego.setState({
            jugador1:nombre1,
            jugador2:nombre2
        })
        iniciar(juego)
    }

    return (
        <div>
        <Backdrop style={{ display:'flex',flexDirection:'column',color:'black' }} className={classes.backdrop} open={open}>
            <div style={{ width:'40%',height:'40%', backgroundColor:'whitesmoke',alignItems:'center',margin:'0px auto' }}>
                <h1>Bienvenidos jugadores</h1>
                <div style={{ height:'45%',display:'flex',alignItems:'center',margin:'0px auto',verticalAlign:'middle' }}>
                    <TextField style={{ margin:'0px auto'}} id="outlined-basic" label="Jugador 1" variant="outlined" onChange={(text)=>setnombre1(text.target.value)} />
                    <TextField style={{ margin:'0px auto' }} id="outlined-basic" label="Jugador 2" variant="outlined" onChange={(text)=>setnombre2(text.target.value)} />
                </div>
                <Button style={{ backgroundColor:'#5DC1B9',fontWeight:'bold' }} variant="outlined" onClick={()=>jugar()} >Jugar!</Button>
            </div>
        </Backdrop>
        </div>
    );
}