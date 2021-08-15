import pandas as pd
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
print(casos)