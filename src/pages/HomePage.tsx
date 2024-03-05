import CategoryList from "../components/CategoryList";
import NavbarNavigation from "../components/NavbarNavigation";
import SimpleSlider from "../components/SliderHandler";
import "../styles/homepage.scss";
import MiniCardList from "../components/MiniCardList";
import NewProductsList from "../components/NewProductsList";
import RecommendationList from "../components/RecommendationList";
import Brands from "../components/Brands";
import BrandFilterNavbar from "../components/BrandFilterNavbar";
import Apple from "../assets/svgs/brands/image 33.svg";

function HomePage() {
  return (
    <div>
      <BrandFilterNavbar brandTitle="Apple" brandImg={Apple} />
      <NavbarNavigation/>
      <SimpleSlider/>
      <CategoryList/>
      <MiniCardList/>
      <NewProductsList/>
      <RecommendationList/>
      <Brands/>
    </div>
  );
}

export default HomePage;
