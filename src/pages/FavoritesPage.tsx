import { Helmet } from "react-helmet-async"
import Brands from "../components/Brands"
import FavoriteList from "../components/FavoriteList"
import SimpleSlider from "../components/SliderHandler"

function FavoritesPage() {

  return (
    <>
      <Helmet>
        <title>Избранные - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
        <link rel="canonical" href={`https://turanelectronics.kg/favorite`} />
      </Helmet>
      <div> 
          <SimpleSlider/>
          <FavoriteList/>
          <Brands/>
      </div>
    </>
  )
}

export default FavoritesPage