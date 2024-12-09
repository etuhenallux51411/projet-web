import { RouterProvider } from "react-router-dom";
import router from "./router/Router";

function Voila(){
    return <RouterProvider router={router}/>
}

export default Voila;