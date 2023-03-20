import {createBrowserRouter, Navigate, RouteObject} from "react-router-dom"
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import App from "../layout/App";


export const routes: RouteObject[] = [
    {
        path:'/',
        element: <App />,
        children:[
            {'path':'activities',element:<ActivitiesDashboard />},
            {'path':'activities/:id',element:<ActivityDetails />},
            {'path':'createActivity',element:<ActivityForm key='create' />},
            {'path':'manage/:id',element:<ActivityForm  key='manage' />},
            {'path':'errors',element:<TestErrors />},
            {'path':'not-found',element:<NotFound />},
            {'path':'server-error',element:<ServerError />},
            {'path':'*',element:<Navigate to='/not-found' />}
        ]
    }    
]

export const router = createBrowserRouter(routes);