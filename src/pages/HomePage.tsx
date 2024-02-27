import CategoryList from "../components/CategoryList";
import NavbarNavigation from "../components/NavbarNavigation";
import SimpleSlider from "../components/SliderHandler";
import "../styles/homepage.scss";
import MiniCardList from "../components/MiniCardList";

function HomePage() {
  return (
    <div>
      <NavbarNavigation/>
      <SimpleSlider/>
      <CategoryList/>
      {/* <div className={"accessories"}>
        <div className="accessories__item">
          Аксессуары
        </div>
        <div className="accessories__item">
          <div className="accessories__item_img">
            <img src={nextArrow} />
          </div>
          <div className="accessories__item_img">
            <img src={prevArrow} />
          </div>
        </div>
      </div> */}
      <MiniCardList/>
    </div>
  );
}

export default HomePage;
