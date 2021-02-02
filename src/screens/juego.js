import { render } from '@testing-library/react';
import React from 'react';
import Tablero from './../components/tablero'
import Nombre from './../components/nombre'

export default function Juego (props){
    const {juego,size,iniciar} = props
        return(
            <div>
                <h1>Juego 3 en línea</h1>
                <div>
                    {(juego.state.jugador1 === "" && juego.state.jugador2 === "")?<Nombre iniciar={iniciar} juego={juego}/>:null}
                </div>
                <Tablero juego={juego} size={size}/>
            </div>
        )
}