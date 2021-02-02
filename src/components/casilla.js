import React from 'react'
import Button from '@material-ui/core/Button';

export default function Casilla (props){

    const {x,y,juego,size} = props

    function click(){

        juego.state.tablero[x][y].jugador= juego.state.jugadorActual
        
        let movimientos = juego.state.movimientos;
        
        let tablero = juego.state.tablero        
        
        
        if(tablero[x][y].jugador === "X"){
            juego.setState({
                jugadorActual: "O"
            })
        }else{
            juego.setState({
                jugadorActual: "X"
            })
        }
        
        if(comprobarHorizontalJ1() ||comprobarVerticalJ1() || comprobarDiagonalJ1()){
            juego.setState({
                ganador:juego.state.jugador1,
                why:"Consiguió hacer tres en línea"
            })
        }
        
        if(comprobarHorizontalJ2() ||comprobarVerticalJ2() || comprobarDiagonalJ2()){
            juego.setState({
                ganador:juego.state.jugador2,
                why:'Conguió hacer tres en línea'
            })
        }
        
        var turno = juego.state.turno + 1
        
        juego.state.tablero[x][y].turno= turno

        movimientos.push({x:x,y:y,jugador:juego.state.jugadorActual,turno:juego.state.turno})
        
        juego.setState({
            movimientos: movimientos,
            turno:turno
        })

        if(juego.state.movimientos.length === 9){
            if(juego.state.tiempoJ1 < juego.state.tiempoJ2){
                juego.setState({
                    ganador:juego.state.jugador1,
                    why:"Porque ha usado menos tiempo"
                })
            }else{
                juego.setState({
                    ganador:juego.state.jugador2,
                    why:"Por que ha usado menos tiempo"
                })
            }
        }

    }

    function comprobarDiagonalJ1(){
        let tablero = juego.state.tablero
        let ganar = false;
        if((tablero[0][0].jugador === "X" && tablero[1][1].jugador === "X" && tablero[2][2].jugador === "X") || (tablero[0][2].jugador === "X" && tablero[1][1].jugador === "X" && tablero[2][0].jugador === "X")){
            ganar=true;
            juego.setState({
                ganador:juego.state.jugador1
            })
        }
        return ganar;
    }

    function comprobarDiagonalJ2(){
        let tablero = juego.state.tablero
        let ganar = false;
        if((tablero[0][0].jugador === "O" && tablero[1][1].jugador === "O" && tablero[2][2].jugador === "O") || (tablero[0][2].jugador === "O" && tablero[1][1].jugador === "O" && tablero[2][0].jugador === "O")){
            ganar=true;
            juego.setState({
                ganador:juego.state.jugador1
            })
        }
        return ganar;
    }

    function comprobarVerticalJ1(){
        let vertical = [];
        let lleno = [];
        let ganar = false;
        for (let i = 0; i < size; i++) {
            vertical.push(juego.state.tablero[i][y].jugador)    
        }

        for (let i = 0; i < size; i++) {
            if(vertical[i]==="X"){
                lleno.push(1)
            }            
        }

        if(lleno.length === size){
            ganar = true
        }

        return ganar;
    }

    function comprobarHorizontalJ1(){
        let horizontal = [];
        let lleno = [];
        let ganar = false;

        for (let i = 0; i < size; i++) {
            horizontal.push(juego.state.tablero[x][i].jugador)
        }

        for (let i = 0; i < size; i++) {
            if(horizontal[i]==="X"){
                lleno.push(1)
            }
        }

        if(lleno.length === size){
            ganar = true
        }

        return ganar;
    }

    function comprobarHorizontalJ2(){
        let horizontal = [];
        let lleno = [];
        let ganar = false;

        for (let i = 0; i < size; i++) {
            horizontal.push(juego.state.tablero[x][i].jugador)            
        }

        for (let i = 0; i < size; i++) {
            if(horizontal[i]==="O"){
                lleno.push(1)
            }            
        }

        if(lleno.length === size){
            ganar = true
        }

        return ganar;
    }

    function comprobarVerticalJ2(){
        let vertical = [];
        let lleno = [];
        let ganar = false;

        for (let i = 0; i < size; i++) {
            vertical.push(juego.state.tablero[i][y].jugador)            
        }

        for (let i = 0; i < size; i++) {
            if(vertical[i]==="O"){
                lleno.push(1)
            }            
        }

        if(lleno.length === size){
            ganar = true
        }

        return ganar;
    }


    return(
        (juego.state.ganador!=="")
        ?
            <Button 
                style={{ height:'60px',margin:'2px',background:'lightgray',color:'black' }} 
                disabled 
                variant="contained" 
                color="primary" 
                >
                    {(juego.state.tablero.length === 0)?"":juego.state.tablero[x][y].jugador}
            </Button>
        :
            (juego.state.tablero[x][y].jugador !== "")
            ?
                (juego.state.tablero[x][y].jugador === "X")
                ?
                    <Button 
                        style={{ height:'60px',margin:'2px',background:'#641C34' }} 
                        variant="contained" 
                        color="primary"
                        >
                            {(juego.state.tablero.length === 0)?"":juego.state.tablero[x][y].jugador}
                    </Button>
                :
                    <Button 
                        style={{ height:'60px',margin:'2px',background:'#572364' }} 
                        variant="contained" 
                        color="primary"
                        >
                            {(juego.state.tablero.length === 0)?"":juego.state.tablero[x][y].jugador}
                    </Button>

            :
            <Button 
                style={{ height:'60px',margin:'2px',background:'#5DC1B9' }} 
                variant="contained" 
                color="primary"                 
                onClick={()=>click()}
            >
                    {(juego.state.tablero.length === 0)?"":juego.state.tablero[x][y].jugador}
            </Button>
    )
}