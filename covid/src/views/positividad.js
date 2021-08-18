import React, {useState, useEffect} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function Vacunas(props) {
    var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    var dayName = days[new Date().getDay()];
    useEffect(() => {
        axios.get("http://3.138.175.135:4000/Positividad", {
                params: {
                    "tipo":dayName
                }}).then(async (res) => {
                    const data = await res.data.Incidencia;
                    console.log(data)
                    setValores2(data)
                    var resultado = dayName
                    setEstado2(resultado)
                    document.getElementById('nombre').innerHTML = "Positividad " + dayName +" "+ String(data[data.length-1].dia) + " = " + String(data[data.length-1].positividad) +"%"
                    document.getElementById('casos111').innerHTML = "Positividad el "+ dayName +" "+ String(data[data.length - 2].dia)+" = "+String(data[data.length - 2].positividad) +"%"
                    document.getElementById('casos211').innerHTML = "Positividad el "+ dayName +" "+ String(data[data.length - 3].dia)+" = "+String(data[data.length - 3].positividad) +"%"
                    document.getElementById('casos311').innerHTML = "Positividad el "+ dayName +" "+ String(data[data.length - 4].dia)+" = "+String(data[data.length - 4].positividad) +"%"
                    document.getElementById('casos411').innerHTML = "Positividad el "+ dayName +" "+ String(data[data.length - 5].dia)+" = "+String(data[data.length - 5].positividad) +"%"
        
                })
                .catch((err) => {
                    console.log(err);
                });
      }, []);
    const options=["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"]
    const [value2, setValue2] = React.useState(dayName);
    const [inputValue2, setInputValue2] = React.useState('');
    const [valores2, setValores2] = useState([]);
    const [estado2, setEstado2] = useState('');
    const axios = require('axios');
    async function buscar2(value){
        if (value!="Chile") {
            axios.get("http://3.138.175.135:4000/Positividad", {
                params: {
                    "tipo":value
                }}).then(async (res) => {
                   const data = await res.data.Incidencia;
                   console.log(data)
                   setValores2(data)
                    var resultado = value
                   setEstado2(resultado)
                   document.getElementById('nombre').innerHTML = "Positividad " + value +" "+ String(data[data.length-1].dia) + " = " + String(data[data.length-1].positividad) +"%"
                    document.getElementById('casos111').innerHTML = "Positividad el "+ value +" "+ String(data[data.length - 2].dia)+" = "+String(data[data.length - 2].positividad) +"%"
                    document.getElementById('casos211').innerHTML = "Positividad el "+ value +" "+ String(data[data.length - 3].dia)+" = "+String(data[data.length - 3].positividad) +"%"
                    document.getElementById('casos311').innerHTML = "Positividad el "+ value +" "+ String(data[data.length - 4].dia)+" = "+String(data[data.length - 4].positividad) +"%"
                    document.getElementById('casos411').innerHTML = "Positividad el "+ value +" "+ String(data[data.length - 5].dia)+" = "+String(data[data.length - 5].positividad) +"%"
        
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    return (
    
    <div className="App">
        <header className="App-header2">
        
        
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />  
        </header>
        <body>
        <br></br>
        <div  style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        <Autocomplete
            value={value2}
            onChange={(event, newValue) => {
            setValue2(newValue);
            buscar2(newValue)
            }}
            inputValue={inputValue2}
            onInputChange={(event, newInputValue) => {
            setInputValue2(newInputValue);
            }}
            id="combo-box-demo"
            options={options}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Seleccionar datos" variant="outlined" defaultValue="Casos sintomaticos"/>}
        />
        </div>
        <h1 id='nombre'></h1>
        <div  style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        
        {estado2 !== '' && (
            
        <ResponsiveContainer width="95%" height={400}>
            <LineChart  data={valores2}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="positividad" stroke="#a83232" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="dia" />
        <Tooltip/>
        <Legend />
        <YAxis />
        </LineChart>
        </ResponsiveContainer>
            )}


            
        </div>
        <div>
        <p id='casos111'></p>
        <p id='casos211'></p>
        <p id='casos311'></p>
        <p id='casos411'></p>
        <p id='casos511'></p>
        </div>
        </body>
        </div>
    );
    
      
}

export default Vacunas;