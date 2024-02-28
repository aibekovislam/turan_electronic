import Brands from "../components/Brands"
import FavoriteList from "../components/FavoriteList"
import Footer from "../components/Footer"
import SimpleSlider from "../components/SliderHandler"

function FavoritesPage() {

  return (
    <div> 
        <SimpleSlider/>
        <FavoriteList/>
        <Brands/>
        <Footer/>
    </div>
  )
}

export default FavoritesPage