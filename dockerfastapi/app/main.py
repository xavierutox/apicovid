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
@app.route("/R")
@cross_origin()
def R():
    url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto54/r.nacional.csv'
    df = pd.read_csv(url)
    df_list = df.values.tolist()
    casos=[]
    datos={}
    for i in range(len(df)):
        datos={}
        datos["fecha"]=df_list[i][0]
        datos["r"]=round(df_list[i][1],3)
        casos.append(datos)
    return {
        "casos": casos
    }
@app.route("/Vacunas")
@cross_origin()
def vacunas():
    url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto90/incidencia_en_vacunados.csv'
    df = pd.read_csv(url)
    df_list = df.values.tolist()
    casos=[]
    datos={}
    tipo = saxutils.unescape(request.args.get('tipo'))
    tipo = unidecode.unidecode(tipo)
    print(tipo)
    if(tipo=="Fallecidos"):
        for i in range(len(df)):
            datos={}
            datos["semana"]=df_list[i][0]
            datos["sin_vacunar"]=df_list[i][13]
            datos["1_dosis"]=df_list[i][14]
            datos["2_dosis"]=df_list[i][15]
            datos["completo"]=df_list[i][16]
            datos["dosis_unica"]=df_list[i][17]
            datos["dosis_unica_completo"]=df_list[i][18]
            casos.append(datos)
        return{
            "casos":casos
        }
    elif(tipo=="Ingresos UCI"):
        for i in range(len(df)):
            datos={}
            datos["semana"]=df_list[i][0]
            datos["sin_vacunar"]=df_list[i][7]
            datos["1_dosis"]=df_list[i][8]
            datos["2_dosis"]=df_list[i][9]
            datos["completo"]=df_list[i][10]
            datos["dosis_unica"]=df_list[i][11]
            datos["dosis_unica_completo"]=df_list[i][12]
            casos.append(datos)
        return{
            "casos":casos
        }
    elif(tipo=="Casos sintomaticos"):
        for i in range(len(df)):
            datos={}
            datos["semana"]=df_list[i][0]
            datos["sin_vacunar"]=df_list[i][1]
            datos["1_dosis"]=df_list[i][2]
            datos["2_dosis"]=df_list[i][3]
            datos["completo"]=df_list[i][4]
            datos["dosis_unica"]=df_list[i][5]
            datos["dosis_unica_completo"]=df_list[i][6]
            casos.append(datos)
        return{
            "casos":casos
        }
@app.route("/Positividad")
@cross_origin()
def posititivad():
    url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto49/Positividad_Diaria_Media.csv'
    df = pd.read_csv(url)
    df_list = df.values.tolist()
    tipo = saxutils.unescape(request.args.get('tipo'))
    tipo = unidecode.unidecode(tipo)
    print(tipo)
    if(tipo=="Lunes"):
        Incidencia=[] #lunes
        columnas=df.columns[1:]
        data=df_list[3][1:]
        for i in range(5,len(df_list[0]),7):
            try:
                datos={}
                datos["dia"]=columnas[i]
                datos["positividad"]=round(data[i]*100,2)
                Incidencia.append(datos)
            except:
                break
    elif(tipo=="Martes"):
        Incidencia=[] #martes
        columnas=df.columns[1:]
        data=df_list[3][1:]
        for i in range(6,len(df_list[0]),7):
            try:
                datos={}
                datos["dia"]=columnas[i]
                datos["positividad"]=round(data[i]*100,2)
                Incidencia.append(datos)
            except:
                break
    elif(tipo=="Miercoles"):
        Incidencia=[] #miercoles
        columnas=df.columns[1:]
        data=df_list[3][1:]
        for i in range(0,len(df_list[0]),7):
            try:
                datos={}
                datos["dia"]=columnas[i]
                datos["positividad"]=round(data[i]*100,2)
                Incidencia.append(datos)
            except:
                break
    elif(tipo=="Jueves"):
        Incidencia=[] #jueves
        columnas=df.columns[1:]
        data=df_list[3][1:]
        for i in range(1,len(df_list[0]),7):
            try:
                datos={}
                datos["dia"]=columnas[i]
                datos["positividad"]=round(data[i]*100,2)
                Incidencia.append(datos)
            except:
                break
    elif(tipo=="Viernes"):
        Incidencia=[] #viernes
        columnas=df.columns[1:]
        data=df_list[3][1:]
        for i in range(2,len(df_list[0]),7):
            try:
                datos={}
                datos["dia"]=columnas[i]
                datos["positividad"]=round(data[i]*100,2)
                Incidencia.append(datos)
            except:
                break
    elif(tipo=="Sabado"):
        Incidencia=[] #sabado
        columnas=df.columns[1:]
        data=df_list[3][1:]
        for i in range(3,len(df_list[0]),7):
            try:
                datos={}
                datos["dia"]=columnas[i]
                datos["positividad"]=round(data[i]*100,2)
                Incidencia.append(datos)
            except:
                break
    elif(tipo=="Domingo"):
        Incidencia=[] #domingo
        columnas=df.columns[1:]
        data=df_list[3][1:]
        for i in range(4,len(df_list[0]),7):
            try:
                datos={}
                datos["dia"]=columnas[i]
                datos["positividad"]=round(data[i]*100,2)
                Incidencia.append(datos)
            except:
                break
    return{"Incidencia":Incidencia}
    
if __name__ == "__main__":
	app.run(host="0.0.0.0", port=4000)