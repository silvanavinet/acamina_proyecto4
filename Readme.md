# Proyecto 4

## Descargar el proyecto

```bash
git clone https://github.com/silvanavinet/acamica_proyecto_4
```

## Corriendo el proyecto

### Primero: Inicialización de la base de datos
Correr el script para crear la BD.

```sql
CREATE DATABASE companias;
```

Luego se debe deben correr los comandos SQL que estan en el archivo, dentro de la base de datos campanias 

```
./back/files/data.sql
```

El script incluye 2 usuarios, uno basico y otro admin, las credenciales son:

basico

```
usuario: basico@gmail.com
pass: 1234
```

admin

```
usuario: admin@gmail.com
pass: 12345
```


### Segundo:  Variables de Ambiente en Back

- Existe el archivo **./back/.env-ejemplo** que especifica las variables de entorno necesarias para correr el proyecto.
- Se le debe cambiar el nombre de **./back/.env-ejemplo** a **./back/.env**
- Es necesario **actualizar los valores** de las tres variables que existen en el archivo .env

### Tercero:  Instalación NODE modules 

Realizar las siguientes pasos para inicializar el servidor

```bash
npm install
```

Y echar a correr el servidor

```bash
nodemon index.js 
```

###  Cuarto: Front End

Con el plugin de Live Server de VScode levantar el front, estando parado en la raiz de la
carpeta ./front. Este secomunica con el backend.