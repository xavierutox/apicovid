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
    elif(tipo=="Todos"):
        Incidencia=[] #domingo
        columnas=df.columns[1:]
        data=df_list[3][1:]
        for i in range(len(df_list[0])):
            try:
                datos={}
                datos["dia"]=columnas[i]
                datos["positividad"]=round(data[i]*100,2)
                Incidencia.append(datos)
            except:
                break
    return{"Incidencia":Incidencia}

@app.route("/Fallecidos")
@cross_origin()
def fallecidos():
    url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto5/TotalesNacionales.csv'
    df = pd.read_csv(url)
    row = df.loc[df["Fecha"]=="Fallecidos"]
    df_list = row.values.tolist()
    casos=[]
    datos={}
    for i in range(len(df_list[0])):
        try:
            datos={}
            datos["name"]=df.columns[i]
            datos["fallecidos"]=df_list[0][i]-df_list[0][i-1]
        except:
            datos={}
            datos["name"]=df.columns[i]
            datos["fallecidos"]=df_list[0][i]
        casos.append(datos)
    return {
        "fallecidos": casos[1:]
    }
@app.route("/Pcr")
@cross_origin()
def pcr():
    url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto49/Positividad_Diaria_Media.csv'
    df = pd.read_csv(url)
    tipo = saxutils.unescape(request.args.get('tipo'))
    tipo = unidecode.unidecode(tipo)
    if tipo=="positividad":
        tipo="positividad pcr"
    row = df.loc[df["Fecha"]==tipo]
    df_list = row.values.tolist()
    casos=[]
    datos={}
    for i in range(len(df_list[0])):
        try:
            datos={}
            datos["name"]=df.columns[i]
            datos["pcr"]=df_list[0][i]
        except:
            datos={}
            datos["name"]=df.columns[i]
            datos["pcr"]=df_list[0][i]
        casos.append(datos)
    return {
        "pcr": casos[1:]
    }
@app.route("/AvanceEdad")
@cross_origin()
def avanceEdad():
    url = 'https://raw.githubusercontent.com/xavierutox/campana-vacunacion-covid-19/main/output/contrib/fraccion_vacunados_edad.csv'
    df = pd.read_csv(url)
    df_list = df.values.tolist()
    casos115={}
    casos1530={}
    casos3045={}
    casos4560={}
    casos6075={}
    casos7590={}
    casos90={}

    #inicializar
    casos115["name"]="0-14"
    casos115["inmunidad"]=0
    casos1530["name"]="15-29"
    casos1530["inmunidad"]=0
    casos3045["name"]="30-44"
    casos3045["inmunidad"]=0
    casos4560["name"]="45-59"
    casos4560["inmunidad"]=0
    casos6075["name"]="50-74"
    casos6075["inmunidad"]=0
    casos7590["name"]="75-89"
    casos7590["inmunidad"]=0
    casos90["name"]="90+"
    casos90["inmunidad"]=0

    datos={}

    for (edad,_,_,_,_,_,inmunidad) in df_list:
        if (edad<15):
            casos115["inmunidad"]=casos115["inmunidad"]+inmunidad
        elif(15<=edad<30):
            casos1530["inmunidad"]=casos1530["inmunidad"]+inmunidad
        elif(30<=edad<45):
            casos3045["inmunidad"]=casos3045["inmunidad"]+inmunidad
        elif(45<=edad<60):
            casos4560["inmunidad"]=casos4560["inmunidad"]+inmunidad
        elif(60<=edad<75):
            casos6075["inmunidad"]=casos6075["inmunidad"]+inmunidad
        elif(75<=edad<90):
            casos7590["inmunidad"]=casos7590["inmunidad"]+inmunidad
        else:
            casos90["inmunidad"]=casos90["inmunidad"]+inmunidad
            

    #calcular promedios
    casos115["inmunidad"]=casos115["inmunidad"]/15
    casos1530["inmunidad"]=casos1530["inmunidad"]/15
    casos3045["inmunidad"]=casos3045["inmunidad"]/15
    casos4560["inmunidad"]=casos4560["inmunidad"]/15
    casos6075["inmunidad"]=casos6075["inmunidad"]/15
    casos7590["inmunidad"]=casos7590["inmunidad"]/15
    casos90["inmunidad"]=casos90["inmunidad"]/11
    meta={}
    meta["name"]="meta"
    meta["inmunidad"]=100

    #colores

    casos115["fill"]="#8884c0"
    casos1530["fill"]="#8884d8"
    casos3045["fill"]="#83a6ed"
    casos4560["fill"]="#8dd1e1"
    casos6075["fill"]="#82ca9d"
    casos7590["fill"]="#a4de6c"
    casos90["fill"]="#d0ed57"
    meta["fill"]="#ffffff"
    return{
        "casos":[
            casos115,casos1530,casos3045,casos4560,casos6075,casos7590,casos90,meta
        ]
    }

@app.route("/TotalesVacunas")
@cross_origin()
def totalesVacunas():
    url = 'https://raw.githubusercontent.com/loqueelvientoajuarez/campana-vacunacion-covid-19/main/output/contrib/vacunas_importadas_fabricante_fecha.csv'
    df2 = pd.read_csv(url)
    df_list = df2.values.tolist()
    datos=df_list
    linea2=[]
    vacunas={}
    vacunas["Total"]=0
    for dato in datos:
        
        if (dato[2] not in vacunas.keys()):
            vacunas[dato[2]]=dato[3]
            vacunas["Total"]=vacunas["Total"]+dato[3]
        else:
            vacunas[dato[2]]=vacunas[dato[2]]+dato[3]
            vacunas["Total"]=vacunas["Total"]+dato[3]
    for i in vacunas.keys():
        dic={}
        dic["name"]=i
        dic["vacunas"]=vacunas[i]
        linea2.append(dic)
    return{
        "casos":linea2
    }

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=4000)