import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { lazy } from "react";
import DetailLayout from "../layouts/DetailLayout";
const HomePage = lazy(() => import("../pages/HomePage"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"));
const DetailPage = lazy(() => import("../pages/DetailPage"));
const RegistrationAndAuthorization = lazy(() => import("../pages/RegistrationAndAuthorization"));
const BrandsPage = lazy(() => import("../pages/BrandsPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const ConfirmPage = lazy(() => import("../pages/ConfirmPage"));
const NewProductsPage = lazy(() => import("../pages/NewProductsPage"));
const RecommendationProductsPage = lazy(() => import("../pages/RecommendationProductsPage"));
const CategoryPage = lazy(() => import("../pages/CategoryPage"));
const NewsPage = lazy(() => import("../pages/NewsPage"));
const AboutUs = lazy(() => import("../pages/AboutUs"));
const UserProfilePage = lazy(() => import("../pages/UserProfilePage"));
const ResendPage = lazy(() => import("../pages/ResendPage"));
const ConfirmWithPassword = lazy(() => import("../pages/ConfirmWithPassword"));
const Sender = lazy(() => import("../pages/Sender"));
const GoogleNavigateLoginPage = lazy(() => import("../pages/GoogleNavigateLoginPage"));
const NewsDetailPage = lazy(() => import("../pages/NewsDetailPage"));
const FilteredRoutePage = lazy(() => import("../pages/FilteredRoutePage"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const AdminChatPage = lazy(() => import("../pages/AdminChatPage"));

function MainRoutes() {
  return (
    <Routes>
      <Route element={<DetailLayout />}>
        <Route element={<DetailPage />} path="/products/:id" />
      </Route>
      <Route element={<MainLayout />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<FavoritesPage />} path="/favorite" />
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
        <Route element={<AdminChatPage />} path="/admin/chat" />
      </Route>
    </Routes>
  )
}

export default MainRoutes;
