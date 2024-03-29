import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

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
            localStorage.setItem("userInfo", JSON.stringify({
                user: "Google User"
            }))
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