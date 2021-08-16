import React, {useState, useEffect} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function R(props) {
    useEffect(() => {
        axios.get("http://3.138.175.135:4000/R").then(async (res) => {
                   const data = await res.data.casos;
                   console.log(data)
                   setValores3(data)
                    var resultado = "R"
                   setEstado3(resultado)
                   document.getElementById('nombre').innerHTML = "Número de reproducción efectivo"
        
                })
                .catch((err) => {
                    console.log(err);
                });
      }, []);
    const options=["R"]
    const [value3, setValue3] = React.useState("R");
    const [inputValue3, setInputValue3] = React.useState('');
    const [valores3, setValores3] = useState([]);
    const [estado3, setEstado3] = useState('');
    const axios = require('axios');
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
        </div>
        <h1 id='nombre'></h1>
        <div  style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        >
        
        {estado3 !== '' && (
            
        <ResponsiveContainer width="95%" height={400}>
            <LineChart  data={valores3}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="r" stroke="#a83232" strokeWidth={2} dot={null}/>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="fecha" />
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

export default R;