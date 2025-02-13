import './App.css';
import './styles/global.css'
import './components/MainNav'
import HomePage from './pages/HomePage'
import React from "react";
import Layout from "./layout/Layout";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import {AuthProvider} from "./context/AuthContext";
import Profil from "./pages/Profil";


function App() {
  return (
      <AuthProvider>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
            <Route path={"product/:id"} element={<ProductDetails />} />
            <Route path="/contact/" element={<Layout />}>
                <Route index element={<Contact />} />
            </Route>
            <Route path="/products" element={<Layout />}>
                <Route index element={<ProductList />} />
            </Route>
            <Route path="/login" element={<Layout />}>
                <Route index element={<Login />} />
            </Route>
            <Route path="/profil" element={<Layout />}>
                <Route index element={<Profil />} />
            </Route>
          {/*Si la route n'est pas trouver renvoie vers le components notfound sois 404*/}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
