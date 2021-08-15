import pandas as pd
url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto90/incidencia_en_vacunados.csv'
df = pd.read_csv(url)
df_list = df.values.tolist()

casos=[]
datos={}
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
    print(datos)