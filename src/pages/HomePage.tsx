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

function HomePage() {
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const tokenString = localStorage.getItem("tokens");
  const token = tokenString ? JSON.parse(tokenString) : null;

  return (
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
  );
}

export default HomePage;
