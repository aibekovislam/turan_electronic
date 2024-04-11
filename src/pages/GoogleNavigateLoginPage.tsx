import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { userMe } from "../store/features/auth/authSlice";

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
        <h1>
            Авторизация прошла, можете перейти на главную страницу
        </h1>
    )
}

export default GoogleNavigateLoginPage