import Home from "../Page/Home";
import Error404 from "../Page/Error404";
import User from "../Page/User";
import Users from "../Page/Users";

export default [
    {
        path: "/Users",
        exact: true,
        page: Users,
      },
{
    path: "/:id",
    exact: true,
    page: User
},

    {
        path: "/",
        exact: true,
        page: Home,
    },

    {
        path: "*",
        page: Error404,

    }
];