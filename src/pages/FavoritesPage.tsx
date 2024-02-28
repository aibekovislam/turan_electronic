import Brands from "../components/Brands"
import FavoriteEmpty from "../components/FavoriteEmpty"
import FavoriteList from "../components/FavoriteList"
import Footer from "../components/Footer"
import RecommendationList from "../components/RecommendationList"
import SimpleSlider from "../components/SliderHandler"

function FavoritesPage() {

  return (
    <div>
        {/* <FavoriteEmpty/>
        <RecommendationList/> */}
        <SimpleSlider/>
        <FavoriteList/>
        <Brands/>
        <Footer/>
    </div>
  )
}

export default FavoritesPage