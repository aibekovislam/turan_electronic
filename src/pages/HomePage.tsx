import CategoryList from "../components/CategoryList";
import NavbarNavigation from "../components/NavbarNavigation";
import SimpleSlider from "../components/SliderHandler";
import "../styles/homepage.scss";
import MiniCardList from "../components/MiniCardList";
import NewProductsList from "../components/NewProductsList";
import RecommendationList from "../components/RecommendationList";

function HomePage() {
  return (
    <div>
      <NavbarNavigation/>
      <SimpleSlider/>
      <CategoryList/>
      <MiniCardList/>
      <NewProductsList/>
      <RecommendationList/>
    </div>
  );
}

export default HomePage;
