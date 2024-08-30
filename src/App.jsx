import { createContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./component/Nav";
import axios from "axios";
import ShopCart from "./pages/ShopCart";
import ShopingBasket from "./pages/ShopingBasket";
import LandingPage from "./pages/LandingPage";

export const AppContext = createContext(null);

const App = () => {
  const [data, setData] = useState([]);
  const location = useLocation(); 

  // Fetch data from the JSON file
  useEffect(() => {
    axios.get('http://localhost:8000/plant')
      .then((res) => {
        setData(res.data.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <AppContext.Provider value={{ data }}>
      {location.pathname !== '/' && <Nav />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/ShopingBasket" element={<ShopingBasket />} />
        <Route path="/shopCart" element={<ShopCart />} />
      </Routes>
    </AppContext.Provider>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
