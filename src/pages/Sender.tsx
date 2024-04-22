import { Helmet } from "react-helmet-async"

function Sender() {
  return (
    <>
      <Helmet>
        <title>Письмо на почту - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"/>
        <link rel="canonical" href={`https://turanelectronics.kg/activating/load`} />
      </Helmet>
      <h1>
          Пожалуйста подвердите ваш email, мы отправили письмо на вашу почту
      </h1>
    </>
  )
}

export default Sender