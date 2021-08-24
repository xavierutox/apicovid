import pandas as pd
import csv


#paso a paso
#url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto74/paso_a_paso.csv'
#df = pd.read_csv(url)
#df_list = df.values.tolist()



#linea = []
#datos=df_list
#for dato in datos:
#    for i in range(5,len(dato)):
#        linea.append([dato[3],dato[i],df.columns[i]])

#url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto19/CasosActivosPorComuna.csv'
#df2 = pd.read_csv(url)
#df_list = df2.values.tolist()
#datos=df_list
#linea2=[]
#for dato in datos:
#    for i in range(5,len(dato)):
#        if (dato[2]!="Total"):
#            linea2.append([dato[2],dato[i]/dato[4]*100000,df2.columns[i]])
#fields=["Comuna","Tasa","Fecha"]

#with open('Producto2.csv','w') as f:
#    write = csv.writer(f)
#    write.writerow(fields)
#    write.writerows(linea2)


url = 'https://raw.githubusercontent.com/MinCiencia/Datos-COVID19/master/output/producto50/DefuncionesDEIS_confirmadosPorComuna.csv'
df2 = pd.read_csv(url)
df_list = df2.values.tolist()
datos=df_list
linea2=[]
for dato in datos:
    for i in range(5,len(dato)):
        if (dato[2]!="Total"):
            linea2.append([dato[2],dato[i]/dato[4]*100000,df2.columns[i]])
fields=["Comuna","Fallecidos","Fecha"]

with open('Producto3.csv','w') as f:
    write = csv.writer(f)
    write.writerow(fields)
    write.writerows(linea2)

