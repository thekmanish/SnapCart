import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Shipping from "./pages/Shipping.jsx";
import Payment from "./pages/Payment.jsx"
import Summary from "./pages/Summary.jsx"
import OrderDetails from "./pages/OrderDetails.jsx";
import Profile from "./pages/Profile.jsx";
import EditProfile from "./pages/EditProfile.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import PublicRoutes from "./components/routes/PublicRoutes.jsx";
import PrivateRoutes from "./components/routes/PrivateRoutes.jsx";
import { Toaster } from "react-hot-toast";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<PublicRoutes><Login /></PublicRoutes>} />
      <Route path="product/:individualProductId" element={<ProductDetails />} />
      <Route path="/signup" element={<PublicRoutes><SignUp /></PublicRoutes>}/>
      <Route path="/shipping" element={<PrivateRoutes><Shipping /></PrivateRoutes>}/>
      <Route path="/payment" element={<PrivateRoutes><Payment /></PrivateRoutes>}/>
      <Route path="/summary" element={<PrivateRoutes><Summary /></PrivateRoutes>}/>
      <Route path="/orders/:orderId" element={<PrivateRoutes><OrderDetails /></PrivateRoutes>}/>
      <Route path="/profile" element={<PrivateRoutes><Profile /></PrivateRoutes>}/>
      <Route path="/edit-profile" element={<PrivateRoutes><EditProfile /></PrivateRoutes>}/>
      
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Toaster position="top-right" reverseOrder={false} />
    <RouterProvider router={router} />
  </>
);
