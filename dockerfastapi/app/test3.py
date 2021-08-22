import pandas as pd
import csv
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
        print(inmunidad)
        

#calcular promedios
casos115["inmunidad"]=casos115["inmunidad"]/15
casos1530["inmunidad"]=casos1530["inmunidad"]/15
casos3045["inmunidad"]=casos3045["inmunidad"]/15
casos4560["inmunidad"]=casos4560["inmunidad"]/15
casos6075["inmunidad"]=casos6075["inmunidad"]/15
casos7590["inmunidad"]=casos7590["inmunidad"]/15
casos90["inmunidad"]=casos90["inmunidad"]/11
