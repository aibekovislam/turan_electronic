import { useState } from "react"
import Auth from "../components/Auth"
import NavbarNavigation from "../components/NavbarNavigation"
import Reg from "../components/Reg";
import styles from "../styles/auth.module.scss";

function RegistrationAndAuthorization() {
    const [ registered, setRegistered ] = useState(true);

    const handleRegisterOrAuth = async (registeredType: boolean) => {
        if(registeredType === true) {
            setRegistered(true);
        } else {
            setRegistered(false);
        }
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