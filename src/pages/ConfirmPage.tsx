import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { activateUser } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

function ConfirmPage() {
  const [ searchParams ] = useSearchParams();
  const dispatch = useDispatch<any>(); 

  const obj = {
    uid: searchParams.get("uid"),
    token: searchParams.get("token")
  }

  useEffect(() => {
    if (obj.uid !== null && obj.token !== null) {
      dispatch(activateUser(obj));
      console.log(obj);
    }
  }, [dispatch, obj.uid, obj.token]);  

  return (
    <>
      <Helmet>
        <title>Подтверждение аккаунта - Turan electronics</title>
        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
        <link rel="canonical" href={`https://turanelectronics.kg/activate`} />
      </Helmet>
      <div>
          { obj.uid && obj.token ? (
              <h1>Ваш аккаунт активирован, авторизуйтесь пожалуйста. <a href="/auth">Ссылка на авторизацию</a></h1>
            ) : (
              <h1>Мы отправили письмо на вашу почту, подтвердите пожалуйста.</h1>
            ) }
      </div>
    </>
  )
}

export default ConfirmPage