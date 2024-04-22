import { Helmet } from "react-helmet-async"
import CartCardList from "../components/CartCardList"

function CartPage() {
  return (
    <>
      <Helmet>
        <title>Корзина - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
        <link rel="canonical" href={`https://turanelectronics.kg/cart`} />
      </Helmet>
      <div>
        <CartCardList/>
      </div>
    </>
  )
}

export default CartPage