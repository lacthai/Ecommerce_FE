import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "././components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Home from "././pages/Home/Home";
import Login from "././pages/Login/Login";
import Signup from "././pages/Signup/Signup";
import { useDispatch, useSelector } from "react-redux";
import NewProduct from "././pages/NewProduct/NewProduct";
import ProductPage from "././pages/ProductPage/ProductPage";
import CategoryPage from "././pages/CategoryPage/CategoryPage";
import ScrollToTop from "././components/ScrollToTop/ScrollToTop";
import CartPage from "././pages/CartPage/CartPage";
import OrdersPage from "././pages/OrdersPage/OrdersPage";
import AdminDashboard from "././pages/AdminDashboard/AdminDashboard";
import EditProductPage from "././pages/EditProductPage/EditProductPage";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = io("ws://ecommerce-be-6nlj.onrender.com");
        socket.off("notification").on("notification", (msgObj, user_id) => {
            // logic for notification
            if (user_id === user._id) {
                dispatch(addNotification(msgObj));
            }
        });

        socket.off("new-order").on("new-order", (msgObj) => {
            if (user.isAdmin) {
                dispatch(addNotification(msgObj));
            }
        });
    }, []);
    return (
        <div className="App">
            <BrowserRouter>
                <ScrollToTop />
                {/* {user && !user.isAdmin && (
                    <>
                        <Navigation />
                    </>
                )} */}
                <Navigation />
                <Routes>
                    <Route index element={<Home />} />
                    {!user && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}

                    {user && (
                        <>
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                        </>
                    )}
                    {user && user.isAdmin && (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/product/:id/edit" element={<EditProductPage />} />
                        </>
                    )}
                    
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/category/:category" element={<CategoryPage />} />

                    <Route path="/new-product" element={<NewProduct />} />
                    <Route path="/update-profile" element={<UpdateProfile />} />
                    
                    <Route path="*" element={<Home />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;