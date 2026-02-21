import App from "./App";

import { createRoot } from 'react-dom/client';
import GlobalContext from "./globalContext/GlobalContext";
import { ToastContainer } from "react-toastify";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')).render(
    <GlobalContext>
        <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />
        <App/>
    </GlobalContext>
)