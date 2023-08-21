//aca tenemos que hacer la configuracio de Axios

import axios from 'axios';
import { getEnvVariables } from '../helpers';
const {VITE_API_URL} = getEnvVariables();


//Cremos la conexion / config con la api
const calendarApi = axios.create({
  baseURL: VITE_API_URL //usamos la variable de entorno
});

//TODO: configurar interceptores
//podemos interceptar las peticiones que van o que regresan del backend
//ahora vamos a interceptarlo cuando se hace un request y saber si esta valido el token
//Internamente el use se dispara con la configuracion de esa peticion y tenemos que regresar esa config o la config modificada
calendarApi.interceptors.request.use(config => {
  //Aca podemos añadir o modificar headers
  config.headers = {
    ...config.headers,//hacemos este espread para poder tener cualquier otro token que se este utilizando en la app y no sobreescribirlo o perderlo
    'x-token': localStorage.getItem('token'),
  }

  return config;
});


export default calendarApi;