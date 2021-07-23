# Proyecto Dalilah Resto H1

## Descargar el proyecto

```bash
git clone https://github.com/silvanavinet/acamica_proyecto_3
```

## Corriendo el proyecto

### Primero: Inicialización de la base de datos
Correr el script para crear la BD.

```sql
CREATE DATABASE restaurante;
```

Luego se debe importar el archivo de nombre: 

```
./files/restaurante_2021-04-04.sql


### Segundo:  Variables de Ambiente

- Existe el archivo **.env-ejemplo** que especifica las variables de entorno necesarias para correr el proyecto.
- Se le debe cambiar el nombre de **.env-ejemplo** a **.env**
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

### Cuarto: Instalacion POSTMAN
Buscar el archivo 

```bash
./files/RESTAUTANTE.postman_collection.json 
```

e importarlo  a postman para hacer pruebas

### Quinto: Swagger Specs

El archivo

```bash
./files/spec.yml
```

contienen las especificaciones de los endpoints en formato **OpenAPI 3.0.1**