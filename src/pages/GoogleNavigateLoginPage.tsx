import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

function GoogleNavigateLoginPage() {
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch<any>(); 
    const navigate = useNavigate();

    const obj = {
        token: searchParams.get("token")
    }

    useEffect(() => {
        if (obj.token !== null) {
            localStorage.setItem("tokens", JSON.stringify(obj));
            localStorage.setItem("userInfo", JSON.stringify({
                user: "Google User"
            }))
            navigate("/")
        }
    }, [dispatch, obj.token]);  

    return (
        <h1>
            Подождите немного идет авторизация...
        </h1>
    )
}

export default GoogleNavigateLoginPage