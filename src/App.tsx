import { GlobalProvider } from './context/GlobalContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import HomePage from './components/homePage/HomePage';
import ShopPage from './components/shopPage/ShopPage';
import ProductPage from './components/productPage/ProductPage';
import CartPage from './components/cartPage/CartPage';
import CheckOutPage from './components/checkOutPage/CheckOutPage';
import ErrorPage from './components/errorPage/ErrorPage';
import './App.css';

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shop/:productId" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckOutPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
