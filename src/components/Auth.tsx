import styles from "../styles/auth.module.scss"
import pattern from "../assets/svgs/auth/pattern.svg"
import google from "../assets/svgs/auth/google.svg"
import eye from "../assets/svgs/auth/eye.svg"
import { AuthAndRegProps } from "../utils/interfacesAndTypes"
import { useState } from "react"

function Auth({ handleRegisterOrAuth }: AuthAndRegProps) {
    const [ authFormData, setAuthFormData ] = useState({
        email: "",
        password: ""
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setAuthFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLogin = () => {
        handleRegisterOrAuth(true, authFormData)
    }

    return (
        <div className={styles.auth_main}>     
            <div className={styles.auth_container}>
                <div className={styles.auth}>
                    <div className={styles.auth_text}>
                        <p>
                            Авторизуйтесь, указав свои контактные данные, или <br/> воспользовавшись перечисленными сервисами
                        </p>
                    </div>
                    <div className={styles.auth_form}>
                        <div className={styles.auth_input}>
                            <input 
                                type="text" 
                                placeholder="Email или телефон ..." 
                                name="email"
                                value={authFormData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className={styles.auth_input}>
                            <input 
                                type="password"  
                                placeholder="Пароль"
                                name="password"
                                value={authFormData.password}
                                onChange={handleInputChange}
                            />
                            <img src={eye}  className={styles.eye_svg} />
                        </div>
                        <div className={styles.forgotten_password}>
                            <span>Забыли пароль?</span>
                        </div>
                    </div>
                    <div className={styles.auth_button}>
                        <button className={styles.button} onClick={handleLogin}>
                            <a href="#">Войти</a>
                        </button>
                    </div>
                    <div className={styles.auth_title}>
                        <span>Впервые у нас?</span>
                        <a href="#" onClick={handleLogin}>Регистрация</a>
                    </div>
                    <div className={styles.auth_pattern}>
                        <img src={pattern}  />
                    </div>
                    <div className={styles.auth_sign}>
                        <span>Войти через</span>
                        <img src={google} className={styles.sign_icon} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth