import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import { activateUser } from "../store/features/auth/authSlice";
import { useDispatch } from "react-redux";

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
    <div>
        { obj.uid && obj.token ? (
            <h1>Ваш аккаунт активирован, авторизуйтесь пожалуйста. <a href="/auth">Ссылка на авторизацию</a></h1>
          ) : (
            <h1>Мы отправили письмо на вашу почту, подтвердите пожалуйста.</h1>
          ) }
    </div>
  )
}

export default ConfirmPage