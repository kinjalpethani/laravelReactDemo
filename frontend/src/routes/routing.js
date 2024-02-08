import {createBrowserRouter} from "react-router-dom";
import {FormBuild} from "../pages/FormBuild";
import {MainLayout} from "../pages/MainLayout";
import {About} from "../pages/About";
import FormBuilder from "../pages/test";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <FormBuild/>
            },
            {path:'/about', element: <About/>},
            {path:'/test', element: <FormBuilder/>}
        ]
    }
])

export default router;