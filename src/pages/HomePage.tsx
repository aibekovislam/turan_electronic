import CategoryList from "../components/CategoryList";
import NavbarNavigation from "../components/NavbarNavigation";
import SimpleSlider from "../components/SliderHandler";
import "../styles/homepage.scss";
import MiniCardList from "../components/MiniCardList";
import NewProductsList from "../components/NewProductsList";
import RecommendationList from "../components/RecommendationList";
import Brands from "../components/Brands";
import { Analytics } from "@vercel/analytics/react"
import Chat from "../components/Chat";
import { Helmet } from "react-helmet-async";

function HomePage() {
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const tokenString = localStorage.getItem("tokens");
  const token = tokenString ? JSON.parse(tokenString) : null;

  return (
    <>
      <Helmet>
        <title>Turan Electronics - интернет магазин</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
        <link rel="canonical" href={`https://turanelectronics.kg/`} />
        <link rel="icon" type="image/svg+xml" href="./src/assets/logo_for_web.svg" />
        <link rel="shortcut icon" href="./src/assets/logo_for_web.svg" type="image/x-icon"></link>
      </Helmet>
      <div style={{ position: "relative" }}>
        <NavbarNavigation/>
        <SimpleSlider/>
        <CategoryList/>
        <MiniCardList/>
        <NewProductsList/>
        <RecommendationList/>
        <Brands/>
        { user && token && token.access && user.id !== 1 ? (
          <Chat/>
        ) : null }
        <Analytics/>
      </div>
    </>
  );
}

export default HomePage;
