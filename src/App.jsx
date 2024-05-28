import Login from "./components/Login/Login";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Registro } from "./components/Registro/Registro";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const url = new URL(window.location.href);
  const logout = url.searchParams.get("logout");
  const destino = url.searchParams.get("destino");
  const reparti = url.searchParams.get("rep");


  if(localStorage.getItem("destino")){
    localStorage.setItem("destino", destino != null ? destino : localStorage.getItem("destino"));
  }else if(destino){
    localStorage.setItem("destino", destino);
  }

  if(localStorage.getItem("reparticion")){
    localStorage.setItem("reparticion", reparti != null ? reparti : localStorage.getItem("reparticion"));
  }else if(reparti){
    localStorage.setItem("reparticion", reparti);
  }

  // localStorage.setItem("destino",destino? destino : "turnero");
  // localStorage.setItem("reparticion", reparti? reparti : 1711);

if(!destino){
  const url = new URL(`https://smt.gob.ar`);
  window.location.href = url.toString();
}

  url.searchParams.delete("logout");
  // url.searchParams.delete("destino");
  url.searchParams.delete("rep");
  history.replaceState(null, '', url.toString());

  if(logout){
    localStorage.removeItem("token");
  }

  return (
    <HashRouter>
          <Routes>
            <Route exact path="/*" element={<PrivateRoute key="login"><Login /></PrivateRoute>} />
            <Route exact path="/registro" element={<PrivateRoute key="registro"><Registro /></PrivateRoute>} />
          </Routes>
    </HashRouter>
  );
}

export default App;
