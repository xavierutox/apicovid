import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
 
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
 
@app.get("/")
def root (comuna:str):
    url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto19/CasosActivosPorComuna.csv'
    df = pd.read_csv(url)

    row = df.loc[df["Comuna"]==comuna]

    df_list = row.values.tolist()
    casos=[]
    datos={}
    for i in range(len(df_list[0])):
        datos={}
        datos["name"]=df.columns[i]
        datos["casos"]=df_list[0][i]
        casos.append(datos)
    print(casos)
    return {
        "region":casos[0]["casos"],
        "comuna":casos[2]["casos"],
        "poblacion":casos[4]["casos"],
        "casos": casos[5:]
    }

