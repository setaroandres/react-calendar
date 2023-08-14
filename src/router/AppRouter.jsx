import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";


export const AppRouter = () => {

  //Aca luego vamos a poner el status real del usuario, pero por ahora lo mockeamos

  const authStatus = 'authenticated'; //not-authenticated

  return (
    <Routes>
      
      {
        //TODO: autenticacionreal
        (authStatus === 'not-authenticated')
        ? <Route path="/auth/*" element={<LoginPage />}/>
        :<Route path="/*" element={<CalendarPage />}></Route>
      }

      
      {/* Si no esta logueado vamos a esta ruta, es una forma a prueba de fallos, no es necesario pq ya esta arriba */}
      <Route path="/*" element={<Navigate to='/auth/login' />}></Route>

    </Routes>
  )
}
