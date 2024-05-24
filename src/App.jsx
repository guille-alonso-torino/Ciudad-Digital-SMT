import Login from "./components/Login/Login";
import { Routes, Route, HashRouter } from "react-router-dom";
import { Registro } from "./components/Registro/Registro";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const url = new URL(window.location.href);
  const logout = url.searchParams.get("logout");
  const destino = url.searchParams.get("destino");
  const reparti = url.searchParams.get("rep");

  localStorage.setItem("destino",destino? destino : "turnero");
  localStorage.setItem("reparticion", reparti? reparti : 1711);

  url.searchParams.delete("logout");
  url.searchParams.delete("destino");
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
