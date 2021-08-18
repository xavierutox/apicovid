import pandas as pd
url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto49/Positividad_Diaria_Media.csv'
df = pd.read_csv(url)
df_list = df.values.tolist()

casos=[]
datos={}
columnas=df.columns[1:]
datos=df_list[3][1:]
for i in range(1,len(df_list[0])-1,7):
    print(datos[i],columnas[i])