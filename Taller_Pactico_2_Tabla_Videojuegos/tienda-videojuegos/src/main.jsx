import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TablaVideojuegos from './components/TablaVideojuegos.jsx'
import { data } from "./data/videojuegos.js";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TablaVideojuegos videojuegos={data} />
  </StrictMode>,
)