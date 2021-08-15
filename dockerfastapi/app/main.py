import pandas as pd

from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS, cross_origin
import xml.sax.saxutils as saxutils
import unidecode

from werkzeug.utils import HTMLBuilder
 
app = Flask(__name__)
api = Api(app)
app.config['CORS_HEADERS'] = 'Content-Type'
origins = ["*"]

@app.route("/")
@cross_origin()
def root ():
    comuna = saxutils.unescape(request.args.get('comuna'))
    comuna = unidecode.unidecode(comuna)
    print(comuna)
    comuna = comuna.replace("ñ","n")
    comuna = comuna.replace("Ñ","N")
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
    return {
        "region":casos[0]["casos"],
        "comuna":casos[2]["casos"],
        "poblacion":casos[4]["casos"],
        "casos": casos[5:]
    }
@app.route("/Casos")
@cross_origin()
def casos():
    url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto5/TotalesNacionales.csv'
    df = pd.read_csv(url)
    row = df.loc[df["Fecha"]=="Casos nuevos totales"]
    df_list = row.values.tolist()
    casos=[]
    datos={}
    for i in range(len(df_list[0])):
        datos={}
        datos["name"]=df.columns[i]
        datos["casos"]=df_list[0][i]
        casos.append(datos)
    return {
        "casos": casos[1:]
    }
if __name__ == "__main__":
	app.run(host="0.0.0.0", port=4000, ssl_context='adhoc')