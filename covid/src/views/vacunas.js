import React, {useState, useEffect} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function Vacunas(props) {
    useEffect(() => {
        axios.get("http://3.138.175.135:4000/Vacunas", {
                params: {
                    "tipo":"Casos sintomaticos"
                }}).then(async (res) => {
                   const data = await res.data.casos;
                   console.log(data)
                   setValores2(data)
                    var resultado = "Casos sintomaticos"
                   setEstado2(resultado)
                   document.getElementById('nombre').innerHTML = "Inicidencia Casos sintomaticos"
        
                })
                .catch((err) => {
                    console.log(err);
                });
      }, []);
    const options=["Casos sintomaticos","Ingresos UCI", "Fallecidos"]
    const [value2, setValue2] = React.useState("Casos sintomaticos");
    const [inputValue2, setInputValue2] = React.useState('');
    const [valores2, setValores2] = useState([]);
    const [estado2, setEstado2] = useState('');
    const axios = require('axios');
    async function buscar2(value){
        if (value!="Chile") {
            axios.get("http://3.138.175.135:4000/Vacunas", {
                params: {
                    "tipo":value
                }}).then(async (res) => {
                   const data = await res.data.casos;
                   console.log(data)
                   setValores2(data)
                    var resultado = value
                   setEstado2(resultado)
                   document.getElementById('nombre').innerHTML = "Inicidencia "+ String(value)
        
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
        <Line type="monotone" dataKey="sin_vacunar" stroke="#a83232" />
        <Line type="monotone" dataKey="1_dosis" stroke="#3298a8" />
        <Line type="monotone" dataKey="2_dosis" stroke="#3289a8" />
        <Line type="monotone" dataKey="completo" stroke="#3265a8" />
        <Line type="monotone" dataKey="dosis_unica" stroke="#7f32a8" />
        <Line type="monotone" dataKey="dosis_unica_completo" stroke="#a832a6" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="semana" />
        <Tooltip/>
        <Legend />
        <YAxis />
        </LineChart>
        </ResponsiveContainer>
            )}


            
        </div>
        <div>
        <p id='casos11'></p>
        <p id='casos21'></p>
        <p id='casos31'></p>
        <p id='casos41'></p>
        <p id='casos51'></p>
        </div>
        </body>
        </div>
    );
    
      
}

export default Vacunas;