import logo from './logo.svg';
import './App.css';
import './styles/global.css'
// import App from './App';
import './components/MainNav'
import MainNav from "./components/MainNav";
import HomePage from './pages/HomePage'
import React from "react";
import Layout from "./layout/Layout";

import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
            <Route path={"product/:id"} element={<ProductDetails />} />
          {/*Si la route n'est pas trouver renvoie vers le components notfound sois 404*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
