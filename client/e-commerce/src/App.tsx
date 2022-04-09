import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages
import Home from "./views/Home";
import Product from "./views/Product";
import Categories from "./views/Categories";
import Results from "./views/Results";
import NotFound from "./views/NotFound/NotFound";
import Cart from "./views/Cart";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"            element = { <Home /> } />
        <Route path="/product/:id" element = { <Product /> } />
        <Route path="/categories"  element = { <Categories /> } />
        <Route path="/results"     element = { <Results /> } />
        <Route path="/cart"            element = { <Cart /> } />
        <Route path="*"            element = { <NotFound /> } />
      </Routes>
    </Router>
  );
}

export default App;