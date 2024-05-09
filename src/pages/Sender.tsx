import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"

function Sender() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>Письмо на почту - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"/>
        <link rel="canonical" href={`https://turanelectronics.kg/activating/load`} />
      </Helmet>
      <h1>
          { t("email_confirm") }
      </h1>
    </>
  )
}

export default Sender