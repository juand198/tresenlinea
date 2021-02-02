import React from 'react'
import logo from './logo.svg';
import './App.css';
import Juego from './screens/juego'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      tablero:[],
      jugadorActual:"X",
      jugador1:"",
      jugador2:"",
      movimientos:[],
      historial:[],
      ganador:"",
      turno:0,
      tiempoJ1:0,
      tiempoJ2:0,
      why:"",
  }
  let count = null;
  let boolean = true;

}

iniciarReloj(juego){
  console.log("enciendo")
  if(juego.state.ganador === ""){
    juego.count = setInterval(() => {
        if(juego.state.jugadorActual === "X"){
            juego.setState({ tiempoJ1: juego.state.tiempoJ1 + 0.1 });
        }else if(juego.state.jugadorActual === "O"){
            console.log("aa")
            juego.setState({tiempoJ2:juego.state.tiempoJ2 + 0.1})
        }
    }, 100);
  }
}
/**
 * Controla cuando debe de actualizarse, como le he metido un timing entonces el estado cambia continuamente y siempre se está
 * actualizando... entonces eso no está bien, con esto contro cuando si y cuando no debe de actualizarse.... si devuelve true se
 * se pasa al did update... pues comparo el nuevo state con el viejo y si esta cambiando la hora pues no actualizo...
 * me gustaria pulirlo para que se ve el tiempo pasar en vez de cada vez que haces clic... pero...
 * @param {*} nextProps 
 * @param {*} nextState 
 */
shouldComponentUpdate(nextProps, nextState){
  let change = false;

  if(nextState.tiempoJ1 === this.state.tiempoJ1  && nextState.tiempoJ2 === this.state.tiempoJ2){
    change = true;
  }
  return change
}


componentDidUpdate(){
  if(this.state.ganador !== ""){
    clearInterval(this.count)
    this.count = null;
  }
}

  render(){
    return(
      <div className='App'>
        <Juego iniciar={this.iniciarReloj} size={3} juego={this}/>
      </div>
    )
  }
}

export default App;
