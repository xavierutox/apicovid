import psycopg2
import csv
conn = psycopg2.connect("host=localhost dbname=postgres user=postgres")
cur = conn.cursor()

cur.execute("""CREATE TABLE paso(
    Comuna text,
    Paso integer,
    Fecha text
)
""")

with open('Producto1.csv', 'r') as f:
    # Notice that we don't need the `csv` module.
    next(f) # Skip the header row.
    cur.copy_from(f, 'paso', sep=',')

cur.execute("""CREATE TABLE tasa(
    Comuna text,
    Tasa float,
    Fecha text
)
""")

with open('Producto2.csv', 'r') as f:
    # Notice that we don't need the `csv` module.
    next(f) # Skip the header row.
    cur.copy_from(f, 'tasa', sep=',')

cur.execute("""CREATE TABLE fallecidos(
    Comuna text,
    Fallecidos float,
    Fecha text
)
""")

with open('Producto3.csv', 'r') as f:
    # Notice that we don't need the `csv` module.
    next(f) # Skip the header row.
    cur.copy_from(f, 'fallecidos', sep=',')



cur.execute("""CREATE or REPLACE VIEW dataset AS
  SELECT paso.Comuna, paso.Fecha, fallecidos.Fallecidos, paso.Paso
  FROM paso
  INNER JOIN tasa
  ON paso.Comuna = tasa.Comuna and paso.Fecha = tasa.Fecha
  INNER JOIN fallecidos
  ON paso.Comuna = fallecidos.Comuna and paso.Fecha = fallecidos.Fecha;
""")

cur.execute("""SELECT * FROM dataset
""")
resp =cur.fetchall()
with open('ProductoTotal.csv','w') as f:
    write = csv.writer(f)
    write.writerow(["Comuna","Fecha","Tasa","Fallecidos","Paso"])
    write.writerows(resp)

#conn.commit()