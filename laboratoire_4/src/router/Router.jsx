import { createBrowserRouter } from "react-router-dom";
import Home from "../view/Acceuil.jsx";
import Table from "../view/table.jsx";
import GenericTable from "../view/genericTable.jsx";
import Profile from "../models/profile.jsx";
import Order from "../models/order.jsx";
import OrderItems from "../models/orderItems.jsx";
import Product from "../models/product.jsx";
import Review from "../models/review.jsx";
import ProfileForm from "../components/form/profileForm.jsx";

const router = createBrowserRouter([
    {
        path: "/table/:tableName",
        element: < Table />,
    },
    {
        path: "/table/profile",
        element: < GenericTable ObjectLigne={Profile} tableName={"profile"} profileForm={<ProfileForm/>} />,
    },
    {
        path: "/table/orders",
        element: < GenericTable ObjectLigne={Order} tableName={"orders"} />,
    },
    {
        path: "/table/order_items",
        element: < GenericTable ObjectLigne={OrderItems} tableName={"order_items"} />,
    },
    {
        path: "/table/review",
        element: < GenericTable ObjectLigne={Review} tableName={"review"} />,
    },
    {
        path: "/table/product",
        element: < GenericTable ObjectLigne={Product} tableName={"product"} />,
    },
    {
        path: "/*",
        element: <Home/>
    }
]);

export default router;