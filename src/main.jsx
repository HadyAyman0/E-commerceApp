import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from '@material-tailwind/react';
import '@fortawesome/fontawesome-free/css/all.min.css'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
import "react-image-gallery/styles/css/image-gallery.css";

register();
ReactDOM.createRoot(document.getElementById('root')).render(

  <ThemeProvider>
    <App />
  </ThemeProvider>

)
