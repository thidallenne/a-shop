import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { PrimeReactProvider} from 'primereact/api';
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css"; 
import { BrowserRouter } from 'react-router-dom';
import 'primeflex/primeflex.scss';
import { ThemeProvider } from './context/ThemeContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <PrimeReactProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PrimeReactProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
