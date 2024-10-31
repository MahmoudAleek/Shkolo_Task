import { createBrowserRouter } from "react-router-dom";
import ButtonGrid from "./components/ButtonGrid";
import ButtonForm from "./components/ButtonForm";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <ButtonGrid />,
  },
  {
    path: "/updateButtonInfo/:id",
    element: <ButtonForm />,
  },
  {
    path: "/addNewButton",
    element: <ButtonForm />,
  },
]);

export default routes;
