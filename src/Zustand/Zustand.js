import { create } from 'zustand';
import axios from '../config/axios';

const useStore = create((set) => ({
  errors: "",
  setErrors: (newValues) => set(() => ({ errors: newValues })),

  authenticated: false,

  user: null,

  loading: true,
  
  botonState: false,

  login: async (values) => {
    set({ botonState: true });
    try {
      set({errors : ""})
      const { data } = await axios.post("/usuarios/login", values);
    
      set({
        authenticated: !!data.user.usuarioSinContraseña
      });
      set({user:data.user.usuarioSinContraseña});
      axios.defaults.headers.common["Authorization"] = data.token;
      localStorage.setItem("token", data.token);
    } catch (error) {
        set({errors : error.response.data?.errors?.length > 0 ?  error.response.data.errors[0].msg : error.response?.data?.message? error.response?.data.message: error.message});
    }
    set({ botonState: false });
  }
  ,

  logout:() => {
    set({authenticated: false });
    localStorage.removeItem("token");
    localStorage.removeItem("saveChanges");
    // localStorage.removeItem("reparticion");
  },

  getAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        set({ loading: false});
        return set({authenticated:false})
      }
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get("/usuarios/authStatus");
      set({user:data.usuarioSinContraseña});
      set({
        authenticated: true
      });
    } catch (error) {
      set({ authenticated: false});
      localStorage.removeItem("token");
      console.log("error de auth");
      console.log(error)
    }
    set({ loading: false});
  },
}))

export default useStore;