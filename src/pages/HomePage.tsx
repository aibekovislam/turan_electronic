import Card from "../components/Card";
import NavbarNavigation from "../components/NavbarNavigation";
import SimpleSlider from "../components/SliderHandler";

function HomePage() {
  return (
    <div>
      <NavbarNavigation/>
      <SimpleSlider/>
      <Card/>
    </div>
  );
}

export default HomePage;
