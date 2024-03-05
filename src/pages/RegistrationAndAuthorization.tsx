import { useState } from "react"
import Auth from "../components/Auth"
import NavbarNavigation from "../components/NavbarNavigation"
import Reg from "../components/Reg";
import styles from "../styles/auth.module.scss";
import { authApi } from "../store/features/auth/AuthApi";
import { useDispatch } from "react-redux";
import { setAuthenticated } from "../store/features/auth/authSlice";

function RegistrationAndAuthorization() {
    const [ registered, setRegistered ] = useState(false);
    const dispatch = useDispatch();

    const handleRegisterOrAuth = async (registeredType: boolean, authFormData: any) => {
        if(registeredType === true) {
            setRegistered(true);
            try {
                await authApi.login(authFormData);
                dispatch(setAuthenticated(true))
            } catch (error) {
                console.log(error)
            }
        } else {
            setRegistered(false);
        }
        console.log("Form Data:", authFormData);
    }
    return (
        <>
            <NavbarNavigation/>
            <div className={styles.auth__hero}>
                <div className={styles.auth__hero_title}>{ registered ? "Авторизация" : "Регистрация" }</div>
                { registered ? (
                    <Auth handleRegisterOrAuth={handleRegisterOrAuth} />
                ) : (
                    <Reg handleRegisterOrAuth={handleRegisterOrAuth} />
                ) }
            </div>
        </>
    )
}

export default RegistrationAndAuthorization