# ChronoAPP

Para hacer correr la APP hay que crear dos bases de datos. Una para los test y otra para la app, con los nombres chronometer y chronometer_test.

## Variables de entorno

### Para el backend
Agregar un archivo .env en la carpeta api con lo siguiente:
```
DB_USER=postgres
DB_PASSWORD=(tu password de postgres)
DB_HOST=localhost
DB_NAME=chronometer
DB_TEST_NAME=chronometer_test
DB_PORT=5432
FRONT_URL=http://localhost:3000PORT=3001
```

### Para el frontend
Agregar un archivo .env en la carpeta client con lo siguiente:
```
REACT_APP_BACK_URL=http://localhost:3001
```

## Para iniciar:

Instalar dependencias en la carpeta api y en client
```
npm install
```
Luego en la carpeta api y client
```
npm start
```
## Para correr los test: 
**El backend tiene que estar levantado**

Luego en api y en client
```
npm test
```

## Para editar el backend
Se puede correr el código usando
```
npm run dev
```
Luego para pasarlo a ES5
```
npm run build
```
## Para crear los contenedores Docker
Ejecutar la siguiente línea
```
docker-compose up --build -d
```
Luego
```
docker-compose up
```
