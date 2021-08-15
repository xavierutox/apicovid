import React, {useState, useEffect} from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

function Casos(props) {
    useEffect(() => {
        axios.get("http://3.138.175.135:4000/Casos").then(async (res) => {
               const data = await res.data.casos;
               console.log(data)
               setValores(data)
               
               var dif1=Math.round(100*(parseInt(data[data.length - 1].casos)-parseInt(data[data.length - 8].casos))/parseInt(data[data.length - 8].casos))
               var dif2=Math.round(100*(parseInt(data[data.length - 8].casos)-parseInt(data[data.length - 15].casos))/parseInt(data[data.length - 15].casos))
               var dif3=Math.round(100*(parseInt(data[data.length - 15].casos)-parseInt(data[data.length - 22].casos))/parseInt(data[data.length - 22].casos))
               var dif4=Math.round(100*(parseInt(data[data.length - 22].casos)-parseInt(data[data.length - 29].casos))/parseInt(data[data.length - 29].casos))
                document.getElementById('casos1').innerHTML = "Casos el "+String(data[data.length - 1].name)+": "+String(data[data.length - 1].casos)
                document.getElementById('casos2').innerHTML = "Casos el "+String(data[data.length - 8].name)+": "+String(data[data.length - 8].casos)+" Diferencia: "+String(dif1)+"%"
                document.getElementById('casos3').innerHTML = "Casos el "+String(data[data.length - 15].name)+": "+String(data[data.length - 15].casos)+" Diferencia: "+String(dif2)+"%"
                document.getElementById('casos4').innerHTML = "Casos el "+String(data[data.length - 22].name)+": "+String(data[data.length - 22].casos)+" Diferencia: "+String(dif3)+"%"
                document.getElementById('casos5').innerHTML = "Casos el "+String(data[data.length - 29].name)+": "+String(data[data.length - 29].casos)+" Diferencia: "+String(dif4)+"%"
                var resultado = 'Chile'
               setEstado(resultado)
               document.getElementById('nombre').innerHTML = "Casos en Chile"
    
            })
            .catch((err) => {
                console.log(err);
            });
      }, []);
    
      var options = ['',"Chile","Arica",
      "Camarones",
      "General Lagos",
      "Putre",
      "Alto Hospicio",
      "Camiña",
      "Colchane",
      "Huara",
      "Iquique",
      "Pica",
      "Pozo Almonte","Antofagasta",
      "Calama",
      "María Elena",
      "Mejillones",
      "Ollagüe",
      "San Pedro de Atacama",
      "Sierra Gorda",
      "Taltal",
      "Tocopilla",
      "Alto del Carmen",
      "Caldera",
      "Chañaral",
      "Copiapó",
      "Diego de Almagro",
      "Freirina",
      "Huasco",
      "Tierra Amarilla",
      "Vallenar",
      "Andacollo",
      "Canela",
      "Combarbalá",
      "Coquimbo",
      "Illapel",
      "La Higuera",
      "La Serena",
      "Los Vilos",
      "Monte Patria",
      "Ovalle",
      "Paiguano",
      "Punitaqui",
      "Río Hurtado",
      "Salamanca",
      "Vicuña",
      "Algarrobo",
      "Cabildo",
      "Calera",
      "Calle Larga",
      "Cartagena",
      "Casablanca",
      "Catemu",
      "Concón",
      "El Quisco",
      "El Tabo",
      "Hijuelas",
      "Isla de Pascua",
      "Juan Fernández",
      "La Cruz",
      "La Ligua",
      "Limache",
      "Llaillay",
      "Los Andes",
      "Nogales",
      "Olmué",
      "Panquehue",
      "Papudo",
      "Petorca",
      "Puchuncaví",
      "Putaendo",
      "Quillota",
      "Quilpué",
      "Quintero",
      "Rinconada",
      "San Antonio",
      "San Esteban",
      "San Felipe",
      "Santa María",
      "Santo Domingo",
      "Valparaíso",
      "Villa Alemana",
      "Viña del Mar",
      "Zapallar",
      "Alhué",
      "Buin",
      "Calera de Tango",
      "Cerrillos",
      "Cerro Navia",
      "Colina",
      "Conchalí",
      "Curacaví",
      "El Bosque",
      "El Monte",
      "Estación Central",
      "Huechuraba",
      "Independencia",
      "Isla de Maipo",
      "La Cisterna",
      "La Florida",
      "La Granja",
      "La Pintana",
      "La Reina",
      "Lampa",
      "Las Condes",
      "Lo Barnechea",
      "Lo Espejo",
      "Lo Prado",
      "Macul",
      "Maipú",
      "María Pinto",
      "Melipilla",
      "Ñuñoa",
      "Padre Hurtado",
      "Paine",
      "Pedro Aguirre Cerda",
      "Peñaflor",
      "Peñalolén",
      "Pirque",
      "Providencia",
      "Pudahuel",
      "Puente Alto",
      "Quilicura",
      "Quinta Normal",
      "Recoleta",
      "Renca",
      "San Bernardo",
      "San Joaquín",
      "San José de Maipo",
      "San Miguel",
      "San Pedro",
      "San Ramón",
      "Santiago",
      "Talagante",
      "Tiltil",
      "Vitacura",
      "Chimbarongo",
      "Chépica",
      "Codegua",
      "Coinco",
      "Coltauco",
      "Doñihue",
      "Graneros",
      "La Estrella",
      "Las Cabras",
      "Litueche",
      "Lolol",
      "Machalí",
      "Malloa",
      "Marchihue",
      "Nancagua",
      "Navidad",
      "Olivar",
      "Palmilla",
      "Paredones",
      "Peralillo",
      "Peumo",
      "Pichidegua",
      "Pichilemu",
      "Placilla",
      "Pumanque",
      "Quinta de Tilcoco",
      "Rancagua",
      "Rengo",
      "Requínoa",
      "San Fernando",
      "San Francisco de Mostazal",
      "San Vicente de Tagua Tagua",
      "Santa Cruz",
      "Cauquenes",
      "Chanco",
      "Colbún",
      "Constitución",
      "Curepto",
      "Curicó",
      "Empedrado",
      "Hualañé",
      "Licantén",
      "Linares",
      "Longaví",
      "Maule",
      "Molina",
      "Parral",
      "Pelarco",
      "Pelluhue",
      "Pencahue",
      "Rauco",
      "Retiro",
      "Romeral",
      "Río Claro",
      "Sagrada Familia",
      "San Clemente",
      "San Javier de Loncomilla",
      "San Rafael",
      "Talca",
      "Teno",
      "Vichuquén",
      "Villa Alegre",
      "Yerbas Buenas",
      "Bulnes",
      "Chillán Viejo",
      "Chillán",
      "Cobquecura",
      "Coelemu",
      "Coihueco",
      "El Carmen",
      "Ninhue",
      "Ñiquén",
      "Pemuco",
      "Pinto",
      "Portezuelo",
      "Quillón",
      "Quirihue",
      "Ránquil",
      "San Carlos",
      "San Fabián",
      "San Ignacio",
      "San Nicolás",
      "Treguaco",
      "Yungay",
      "Alto Biobío",
      "Antuco",
      "Arauco",
      "Cabrero",
      "Cañete",
      "Chiguayante",
      "Concepción",
      "Contulmo",
      "Coronel",
      "Curanilahue",
      "Florida",
      "Hualpén",
      "Hualqui",
      "Laja",
      "Lebu",
      "Los Álamos",
      "Los Ángeles",
      "Lota",
      "Mulchén",
      "Nacimiento",
      "Negrete",
      "Penco",
      "Quilaco",
      "Quilleco",
      "San Pedro de la Paz",
      "San Rosendo",
      "Santa Bárbara",
      "Santa Juana",
      "Talcahuano",
      "Tirúa",
      "Tomé",
      "Tucapel",
      "Yumbel",
      "Angol",
      "Carahue",
      "Cholchol",
      "Collipulli",
      "Cunco",
      "Curacautín",
      "Curarrehue",
      "Ercilla",
      "Freire",
      "Galvarino",
      "Gorbea",
      "Lautaro",
      "Loncoche",
      "Lonquimay",
      "Los Sauces",
      "Lumaco",
      "Melipeuco",
      "Nueva Imperial",
      "Padre las Casas",
      "Perquenco",
      "Pitrufquén",
      "Pucón",
      "Purén",
      "Renaico",
      "Saavedra",
      "Temuco",
      "Teodoro Schmidt",
      "Toltén",
      "Traiguén",
      "Victoria",
      "Vilcún",
      "Villarrica",
      "Corral",
      "Futrono",
      "La Unión",
      "Lago Ranco",
      "Lanco",
      "Los Lagos",
      "Mariquina",
      "Máfil",
      "Paillaco",
      "Panguipulli",
      "Río Bueno",
      "Valdivia",
      "Ancud",
      "Calbuco",
      "Castro",
      "Chaitén",
      "Chonchi",
      "Cochamó",
      "Curaco de Vélez",
      "Dalcahue",
      "Fresia",
      "Frutillar",
      "Futaleufú",
      "Hualaihué",
      "Llanquihue",
      "Los Muermos",
      "Maullín",
      "Osorno",
      "Palena",
      "Puerto Montt",
      "Puerto Octay",
      "Puerto Varas",
      "Puqueldón",
      "Purranque",
      "Puyehue",
      "Queilén",
      "Quellón",
      "Quemchi",
      "Quinchao",
      "Río Negro",
      "San Juan de la Costa",
      "San Pablo",
      "Aisén",
      "Chile Chico",
      "Cisnes",
      "Cochrane",
      "Coihaique",
      "Guaitecas",
      "Lago Verde",
      "O’Higgins",
      "Río Ibáñez",
      "Tortel",
      "Antártica",
      "Cabo de Hornos (Ex Navarino)",
      "Laguna Blanca",
      "Natales",
      "Porvenir",
      "Primavera",
      "Punta Arenas",
      "Río Verde",
      "San Gregorio",
      "Timaukel",
      "Torres del Paine"]
    
      options= options.sort()
    
      const [value, setValue] = React.useState("Chile");
      const [inputValue, setInputValue] = React.useState('');
      const [valores, setValores] = useState([]);
      const [estado, setEstado] = useState('');
    
      const axios = require('axios');
      async function buscar(value){
        if (value==="Chile") {
          axios.get("http://3.138.175.135:4000/Casos").then(async (res) => {
               const data = await res.data.casos;
               console.log(data)
               setValores(data)
               
               var dif1=Math.round(100*(parseInt(data[data.length - 1].casos)-parseInt(data[data.length - 8].casos))/parseInt(data[data.length - 8].casos))
               var dif2=Math.round(100*(parseInt(data[data.length - 8].casos)-parseInt(data[data.length - 15].casos))/parseInt(data[data.length - 15].casos))
               var dif3=Math.round(100*(parseInt(data[data.length - 15].casos)-parseInt(data[data.length - 22].casos))/parseInt(data[data.length - 22].casos))
               var dif4=Math.round(100*(parseInt(data[data.length - 22].casos)-parseInt(data[data.length - 29].casos))/parseInt(data[data.length - 29].casos))
                document.getElementById('casos1').innerHTML = "Casos el "+String(data[data.length - 1].name)+": "+String(data[data.length - 1].casos)
                document.getElementById('casos2').innerHTML = "Casos el "+String(data[data.length - 8].name)+": "+String(data[data.length - 8].casos)+" Diferencia: "+String(dif1)+"%"
                document.getElementById('casos3').innerHTML = "Casos el "+String(data[data.length - 15].name)+": "+String(data[data.length - 15].casos)+" Diferencia: "+String(dif2)+"%"
                document.getElementById('casos4').innerHTML = "Casos el "+String(data[data.length - 22].name)+": "+String(data[data.length - 22].casos)+" Diferencia: "+String(dif3)+"%"
                document.getElementById('casos5').innerHTML = "Casos el "+String(data[data.length - 29].name)+": "+String(data[data.length - 29].casos)+" Diferencia: "+String(dif4)+"%"
                var resultado = 'Chile'
               setEstado(resultado)
               document.getElementById('nombre').innerHTML = "Casos en Chile"
    
            })
            .catch((err) => {
                console.log(err);
            });
        } else {
          axios.get("http://3.138.175.135:4000/", {
            params: {
                "comuna":value
            }}).then(async (res) => {
               const data = await res.data.casos;
               console.log(data)
               setValores(data)
               
               var dif1=Math.round(100*(parseInt(data[data.length - 1].casos)-parseInt(data[data.length - 2].casos))/parseInt(data[data.length - 2].casos))
               var dif2=Math.round(100*(parseInt(data[data.length - 2].casos)-parseInt(data[data.length - 3].casos))/parseInt(data[data.length - 3].casos))
               var dif3=Math.round(100*(parseInt(data[data.length - 3].casos)-parseInt(data[data.length - 4].casos))/parseInt(data[data.length - 4].casos))
               var dif4=Math.round(100*(parseInt(data[data.length - 4].casos)-parseInt(data[data.length - 5].casos))/parseInt(data[data.length - 5].casos))
                document.getElementById('casos1').innerHTML = "Casos el "+String(data[data.length - 1].name)+": "+String(data[data.length - 1].casos)
                document.getElementById('casos2').innerHTML = "Casos el "+String(data[data.length - 2].name)+": "+String(data[data.length - 2].casos)+" Diferencia: "+String(dif1)+"%"
                document.getElementById('casos3').innerHTML = "Casos el "+String(data[data.length - 3].name)+": "+String(data[data.length - 3].casos)+" Diferencia: "+String(dif2)+"%"
                document.getElementById('casos4').innerHTML = "Casos el "+String(data[data.length - 4].name)+": "+String(data[data.length - 4].casos)+" Diferencia: "+String(dif3)+"%"
                document.getElementById('casos5').innerHTML = "Casos el "+String(data[data.length - 5].name)+": "+String(data[data.length - 5].casos)+" Diferencia: "+String(dif4)+"%"
                var resultado = value
               setEstado(resultado)
               document.getElementById('nombre').innerHTML = "Casos en "+ String(value)
    
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
              renderInput={(params) => <TextField {...params} label="Seleccionar comuna" variant="outlined" defaultValue="Chile"/>}
            />
          </div>
          <h1 id='nombre'></h1>
          <div>
          {estado !== '' && (
            <ResponsiveContainer width="95%" height={400}>
              <LineChart  data={valores}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="casos" stroke="#8884d8" strokeWidth={2} dot={null}/>
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
          <p id='casos4'></p>
          <p id='casos5'></p>
          </div>
          
          </body>
          
          
        </div>
      );
    
      
}

export default Casos;