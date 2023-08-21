//aca hacemos una funcion que nos va a retornar nuestras variables de entorno
export const getEnvVariables = () => {

  import.meta.env;

  return {
    ...import.meta.env
  }
}