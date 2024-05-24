import { Navigate } from "react-router-dom";
import useStore from "../Zustand/Zustand";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { getAuth, authenticated, loading } = useStore();
  
  useEffect(() => {
    console.log("U1");
    getAuth();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 
  
  useEffect(() => {
    console.log("UE2");
    if(localStorage.getItem("token")){
      if(localStorage.getItem("destino") == "turnero"){
        console.log("cl token");
  
        const token = localStorage.getItem("token");
        const reparticion = localStorage.getItem("reparticion")
        const url = new URL(`https://turnos.smt.gob.ar/`);
        // const url = new URL(`http://181.105.6.205:91/`);
        url.searchParams.append("auth", token);
        url.searchParams.append("rep", reparticion);
        window.location.href = url.toString();
  
      }else if(localStorage.getItem("destino") == "google"){
        const token = localStorage.getItem("token");
        const url = new URL(`https://www.google.com/?hl=es`);
        // url.searchParams.append("auth", token);
        window.location.href = url.toString();
      }else{
        const token = localStorage.getItem("token");
        const url = new URL(`https://smt.gob.ar/`);
        url.searchParams.append("auth", token);
        window.location.href = url.toString();
      }
    }
  }, [authenticated])
  

  return loading ? (
    <Box sx={{ display: "flex" }}>
      <CircularProgress />
    </Box>
  ) : !authenticated ? (
    children
  ) : (
    <Navigate to="/login" />
    // <></>
  );
};

export default PrivateRoute;
