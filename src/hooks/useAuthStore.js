//Tiene por objetivo realizar cualquier interaccion con la parte de auth en nuestro store

import { useDispatch, useSelector } from "react-redux";
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

  const {status, user, errorMessage} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  //Aca vamos a empezar a llegar al backend para la auth
  //Como tenemos que llegar al be y esperar una respuesta tiene que ser async
  const startLogin = async({email, password}) => {
    //console.log({email, password});

    //Hacemos el dispatch de las acciones de authSlice, en este caso empezamos a chequear el login
    dispatch(onChecking());

    //Aca vamos al backend
    try {
      const {data} = await calendarApi.post('/auth', {email, password});
      //Aca ya pasamos la validacion de login
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({name: data.name, uid: data.uid}));

      
    } catch (error) {
      console.log({error});
      dispatch(onLogout('Credenciales Incorrectas'));
      setTimeout( () => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  }

  //Crear la fcn startRegister. Si el registro se hace exitosamente, despachamos onLogin
  //Hay que llegar al endopoint de create user, mandar la data y manejar el error
  const startRegister = async({name, email, password}) => {
    //console.log({name, email, password})
    dispatch(onChecking());

    try {
      const {data} = await calendarApi.post('auth/new', {name, email, password});
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({name: data.name, uid: data.uid}));


    } catch (error) {
      console.log(error);
      //Tenemos que tomar el error como la respuesta completa y ahi desglosar
      dispatch(onLogout(error.response.data?.msg || 'Error en el registro'));
      setTimeout( () => {
        dispatch(clearErrorMessage())
      }, 10);
    }
  }

  const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    if (!token) return dispatch(onLogout());

    try {
      const {data} = await calendarApi.get('auth/renew');
      //Una vez que tenemos el token lo renovamos en el localstorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime());

      dispatch(onLogin({name: data.name, uid: data.uid}));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  }

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout())
  }

  return {
    //Propiedades
    status, 
    user, 
    errorMessage,
    //Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout
  }
}