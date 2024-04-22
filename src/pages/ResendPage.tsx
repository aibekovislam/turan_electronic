import { Helmet } from 'react-helmet-async'
import ResendAuth from '../components/ResendAuth'

function ResendPage() {
  return (
    <>
      <Helmet>
        <title>Подтверждение email - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"/>
        <link rel="canonical" href={`https://turanelectronics.kg/recommendation/resend/auth`} />
      </Helmet>
      <div>
        <ResendAuth/>
      </div>
    </>
  )
}

export default ResendPage