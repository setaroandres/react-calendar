import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";


export const AppRouter = () => {

  //Aca luego vamos a poner el status real del usuario, pero por ahora lo mockeamos
  //const authStatus = 'not-authenticated'; //not-authenticated
  //Ahora si tomamos el status real del usuario para saber si mostramos rutas publicas o privadas
  const {status, checkAuthToken} = useAuthStore();

  //Aca mandamos a llamar al check auth token para renovar / checkear el token del usuario
  useEffect(() => {
    checkAuthToken();
  }, [])
  

  if (status === 'checking') {
    return (
      <h3>Loading...</h3>
    )
  }

  return (
    <Routes>
      
      {
        //TODO: autenticacionreal
        (status === 'not-authenticated')
        ? (
          <>
            <Route path="/auth/*" element={<LoginPage />}/>
            <Route path="/*" element={<Navigate to='/auth/login' />}></Route>
          </>
          ) 
        : (
          <>
            <Route path="/" element={<CalendarPage />}></Route>
            <Route path="/*" element={<Navigate to='/' />}></Route>
          </>
          )
      }

    </Routes>
  )
}
