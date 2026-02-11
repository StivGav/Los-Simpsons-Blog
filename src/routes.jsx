import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import  Home  from "./pages/Home";
import  Layout  from "./pages/Layout";  
import CharacterDetail from "./pages/CharacterDetail";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>

      <Route index element={<Home />} />

      <Route path="character/:id" element={<CharacterDetail />} />

    </Route>
  )
);
