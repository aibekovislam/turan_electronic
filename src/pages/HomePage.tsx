import CategoryList from "../components/CategoryList";
import NavbarNavigation from "../components/NavbarNavigation";
import SimpleSlider from "../components/SliderHandler";

function HomePage() {
  return (
    <div>
      <NavbarNavigation/>
      <SimpleSlider/>
      <CategoryList/>
    </div>
  );
}

export default HomePage;
