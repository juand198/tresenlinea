import { render } from '@testing-library/react';
import React from 'react';
import Casilla from './casilla'
import Winner from './winner'

export default function Tablero(props){

    const {size,juego} = props;

    const [cambio, setcambio] = React.useState(false)
    const [reset, setreset] = React.useState(false)
    
    React.useEffect(() => {
        juego.setState({
            tablero:crearArray(),
            movimientos:[],
            turno:0,
            ganador:"",
            jugadorActual:"X",
            tiempoJ1:0,
            tiempoJ2:0
        })
    }, [reset])

    React.useEffect(() => {
        
    }, [cambio])

    function sacarTiempo(hora){
        let minuto = 60;
        let tiempo = 0;

        if(hora > minuto || hora > minuto *2 || hora > minuto *3){
            tiempo++;
        }

        return " 0" + tiempo + ":"+ hora;
    }
    

    function crearArray(){
        let tabla=[]

        for (let i = 0; i < size; i++) {
            var fila = [];
            for (let j = 0; j < size; j++) {
                fila.push({x:i,y:j,jugador:"",turno:null});                
            }
            tabla.push(fila);
        }
        return tabla;
    }

    function historial(e){
        console.log(juego.state.movimientos.length + " movimientos")

        let movimientos = juego.state.movimientos;
        let tablero = juego.state.tablero
        let index = e.target.id;
        let turno = movimientos[e.target.id].turno


        //Formatea el estado para luego volver al estado al cual he clicado...
        juego.state.tablero.forEach((linea) => {
            linea.forEach((casilla) => {
                if(turno >= casilla.turno && casilla.turno !== null){

                }else{
                    casilla.jugador=""
                }  
                juego.state.turno = e.target.id
            });
        });

        let arr = []

        for (let i = 0; i <= (index-1); i++) {
            arr.push(movimientos[i])    
        }

        if(movimientos[index].jugador === "X"){
            juego.setState({
                jugadorActual: "O",
                atras:true,
                movimientos: arr,
                tablero: tablero
            })
        }else{
            juego.setState({
                jugadorActual: "X",
                atras:true,
                movimientos: arr,
                tablero: tablero
            })
        }

        setcambio(!cambio);
        console.log(juego.state.tablero)
        
        juego.setState({
            jugadorActual:movimientos[index].jugador
        })

    }

    return(
        <div style={{ display:'flex',justifyContent:'center' }}>
            <div style={{ display:'flex',flexDirection:'column',justifyContent:'center',margin:'0px 30px' }}>
                <div>
                    <p>Tiempo {juego.state.jugador1 + sacarTiempo(Math.round(juego.state.tiempoJ1,-1))}</p>
                </div>
                <div>
                    <p>Tiempo {juego.state.jugador2 + sacarTiempo(Math.round(juego.state.tiempoJ2,-1))}</p>

                </div>
            </div>
            <div style={{ width:'fit-content' }}>
                <h3 style={{ fontWeight:'bold' }}>{juego.state.jugador1} VS {juego.state.jugador2}</h3>
                {
                    juego.state.tablero.map((num,index)=>
                    <div>
                        {
                            juego.state.tablero.map((numj,indexj)=>
                                <Casilla size={size} juego={juego} x={index} y={indexj} />
                            )
                        }
                    </div>
                    )
                }
            </div>
            <div style={{ width:'fit-content',marginLeft:'15px',display:'flex',flexDirection:'column',justifyContent:'center',margin:'0px 30px' }}>
                <p>Turno de: {juego.state.jugadorActual==="X"?juego.state.jugador1:juego.state.jugador2}</p>
                    <div>
                    <button onClick={()=>setreset(!reset)}>Reset Game</button>
                        {   
                            juego.state.movimientos.map((mov,index)=>
                                <div>
                                    <button id={index} onClick={(e)=>historial(e)} key={Math.random()}>{((mov.jugador === "X")?juego.state.jugador1:juego.state.jugador2) + " movio " + mov.x + " - " + mov.y}</button>
                                </div>
                            )
                        }                
                    </div>
            </div>
            
            {juego.state.ganador !== ""?<Winner juego={juego}/>:null}
        </div>
    )
}