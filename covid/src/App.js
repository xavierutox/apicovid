import logo from './logo.svg';
import './App.css';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import React, {useState, useEffect} from 'react';

function App() {
  
  const options = ['','Algarrobo', 'Pudahuel','Maipu'];
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [valores, setValores] = useState([]);
  const [estado, setEstado] = useState('');

  const axios = require('axios');
  async function buscar(value){
    
    axios.get("http://3.138.175.135:4000/", {
        params: {
            "comuna":value
        }}).then(async (res) => {
           const data = await res.data.casos;
           console.log(data)
           setValores(data)
           
           var dif1=parseInt(100*(parseInt(data[data.length - 1].casos)-parseInt(data[data.length - 2].casos))/parseInt(data[data.length - 2].casos))
           var dif2=parseInt(100*(parseInt(data[data.length - 1].casos)-parseInt(data[data.length - 3].casos))/parseInt(data[data.length - 3].casos))
            document.getElementById('casos1').innerHTML = "Casos el "+String(data[data.length - 1].name)+": "+String(data[data.length - 1].casos)
            document.getElementById('casos2').innerHTML = "Casos el "+String(data[data.length - 2].name)+": "+String(data[data.length - 2].casos)+" Diferencia: "+String(dif1)+"%"
            document.getElementById('casos3').innerHTML = "Casos el "+String(data[data.length - 3].name)+": "+String(data[data.length - 3].casos)+" Diferencia: "+String(dif2)+"%"
            var resultado = 'aa'
           setEstado(resultado)

        })
        .catch((err) => {
            console.log(err);
        });
    
    
    
  }

  return (
    
    <div className="App">
      <header className="App-header2">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />  
      </header>
      <body>
        <div  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        >
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            buscar(newValue)
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="combo-box-demo"
          options={options}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Seleccionar comuna" variant="outlined"/>}
        />
      </div>
      <div>
      {estado !== '' && (
        <ResponsiveContainer width="95%" height={400}>
          <LineChart  data={valores}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="casos" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip/>
        </LineChart>
        </ResponsiveContainer>
			)}


          
      </div>
      <div>
      <p id='casos1'></p>
      <p id='casos2'></p>
      <p id='casos3'></p>
      </div>
      </body>
      
      
    </div>
  );
}

export default App;
