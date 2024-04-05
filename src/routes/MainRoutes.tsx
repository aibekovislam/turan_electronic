import { Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import FavoritesPage from "../pages/FavoritesPage";
import DetailPage from "../pages/DetailPage";
import RegistrationAndAuthorization from "../pages/RegistrationAndAuthorization";
import BrandsPage from "../pages/BrandsPage";
import CartPage from "../pages/CartPage";
import { useEffect } from "react";
import ConfirmPage from "../pages/ConfirmPage";
import NewProductsPage from "../pages/NewProductsPage";
import RecommendationProductsPage from "../pages/RecommendationProductsPage";
import CategoryPage from "../pages/CategoryPage";
import NewsPage from "../pages/NewsPage";
import AboutUs from "../pages/AboutUs";
import UserProfilePage from "../pages/UserProfilePage";
import ResendPage from "../pages/ResendPage";
import ConfirmWithPassword from "../pages/ConfirmWithPassword";
import Sender from "../pages/Sender";
import GoogleNavigateLoginPage from "../pages/GoogleNavigateLoginPage";
import NewsDetailPage from "../pages/NewsDetailPage";
import FilteredRoutePage from "../pages/FilteredRoutePage";
import SearchPage from "../pages/SearchPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainRoutes() {
  return (
    <Routes>
      <Route element={
        <>
          <ScrollToTop />
          <MainLayout />
        </>
      }
      >
        <Route element={<HomePage />} path="/" />
        <Route element={<FavoritesPage />} path="/favorite" />
        <Route element={<DetailPage />} path="/product/:id" />
        <Route element={<RegistrationAndAuthorization />} path="/auth" />
        <Route element={<UserProfilePage />} path="/profile" />
        <Route element={<ResendPage />} path="/resend/auth" />
        <Route element={<BrandsPage />} path="/products/brands/:brand" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<ConfirmPage />} path="/activate" />
        <Route element={<Sender />} path="/activating/load" />
        <Route element={<GoogleNavigateLoginPage />} path="/login" />
        <Route element={<ConfirmWithPassword />} path="/password/reset/confirm" />
        <Route element={<NewProductsPage />} path="/new/products" />
        <Route element={<RecommendationProductsPage />} path="/recommendation/products" />
        <Route element={<CategoryPage />} path="/categories" />
        <Route element={<NewsPage />} path="/news" />
        <Route element={<AboutUs />} path="/about" />
        <Route element={<NewsDetailPage />} path="/news/:id" />
        <Route element={<SearchPage />} path="/search" />
        <Route element={<FilteredRoutePage />} path="/products/filter/:brand_category_title/:brand" />
      </Route>
    </Routes>
  )
}

export default MainRoutes;
