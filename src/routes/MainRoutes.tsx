import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import FavoritesPage from "../pages/FavoritesPage";
import DetailPage from "../pages/DetailPage";
import RegistrationAndAuthorization from "../pages/RegistrationAndAuthorization";
import BrandsPage from "../pages/BrandsPage";

function MainRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<FavoritesPage />} path="/favorite" />
        <Route element={<DetailPage />} path="/product/:id" />
        <Route element={<RegistrationAndAuthorization/>} path="/auth" />
        <Route element={<BrandsPage/>} path="/products/brands/:brand" />
      </Route>
    </Routes>
  )
}

export default MainRoutes;
