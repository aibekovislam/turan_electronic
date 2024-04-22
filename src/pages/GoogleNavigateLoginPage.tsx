import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { userMe } from "../store/features/auth/authSlice";
import { Helmet } from "react-helmet-async";

function GoogleNavigateLoginPage() {
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch<any>(); 

    const obj = {
        access: searchParams.get("token"),
        refresh: ""
    }

    useEffect(() => {
        if (obj.access !== null) {
            localStorage.setItem("tokens", JSON.stringify(obj));
            dispatch(userMe());
            // navigate("/")
            console.log(obj)
        }
    }, [dispatch, obj.access]);  

    return (
        <>
            <Helmet>
                <title>Успешно прошла авторизация - Turan electronics</title>
                <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
                <link rel="canonical" href={`https://turanelectronics.kg/login`} />
            </Helmet>
            <h1>
                Авторизация прошла, можете перейти на главную страницу
            </h1>
        </>
    )
}

export default GoogleNavigateLoginPage