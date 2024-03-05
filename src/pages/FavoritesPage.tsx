import Brands from "../components/Brands"
import FavoriteList from "../components/FavoriteList"
import SimpleSlider from "../components/SliderHandler"

function FavoritesPage() {

  return (
    <div> 
        <SimpleSlider/>
        <FavoriteList/>
        <Brands/>
    </div>
  )
}

export default FavoritesPage