import { useState } from "react"
import Auth from "../components/Auth"
import NavbarNavigation from "../components/NavbarNavigation"
import Reg from "../components/Reg";
import styles from "../styles/auth.module.scss";
import { Helmet } from "react-helmet-async";

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
            <Helmet>
                <title>Авторизация - Turan electronics</title>
                <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
                <link rel="canonical" href={`https://turanelectronics.kg/recommendation/auth`} />
            </Helmet>
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