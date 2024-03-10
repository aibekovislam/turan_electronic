import styles from "../styles/auth.module.scss"
import pattern from "../assets/svgs/auth/pattern.svg"
import google from "../assets/svgs/auth/google.svg"
import eye from "../assets/svgs/auth/eye.svg"
import { AuthAndRegProps } from "../utils/interfacesAndTypes"
import { useState } from "react"
import axios from "axios"
import { API_URL } from "../utils/consts"
import { useNavigate } from "react-router-dom"

function Reg({ handleRegisterOrAuth }: AuthAndRegProps) {
    const [ loadedAuth, setLoadedAuth ] = useState(false);
    const [ authFormData, setAuthFormData ] = useState({
        email: "",
        password: "",
        name: ""
    })

    const navigate = useNavigate();

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setAuthFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (e: any) => {
        e.preventDefault();
        try {
            setLoadedAuth(true);
            const response = await axios.post(`${API_URL}/users/`, authFormData);
            console.log(response.data);
            if (response.data) {
                navigate("/activate")
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadedAuth(false);
        }
    };

  return (
    <div className={styles.auth_main}>     
        <div className={styles.auth_container}>
            <div className={styles.auth}>
                <div className={styles.auth_text}>
                    <p>
                        Авторизуйтесь, указав свои контактные данные, или <br/> воспользовавшись перечисленными сервисами
                    </p>
                </div>
                <form onSubmit={handleRegister}>
                    <div className={styles.auth_form}>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} value={authFormData.name} type="text" name="name" placeholder="Имя"/>
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type="password" value={authFormData.password} name="password"  placeholder="Пароль"/>
                            <img src={eye}  className={styles.eye_svg} />
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type="password" value={authFormData.password} name="password"  placeholder="Потвердить пароль"/>
                            <img src={eye}  className={styles.eye_svg} />
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type="text" value={authFormData.email} name="email" placeholder="Email или телефон ..."/>
                        </div>
                        <div className={styles.conditions}>
                            <input type="checkbox" className={styles.checkbox_custom} />
                            <p>Я согласен с <a href="#">условиями обработки</a> <br/> персональных данных</p>
                        </div>
                    </div>
                    <div className={styles.auth_button}>
                        { loadedAuth ? (
                            <div>Обработка данных...</div>
                        ) : (
                            <button className={`${styles.reg_button}`} disabled={loadedAuth}>
                                Регистрация
                            </button>
                        ) }
                    </div>
                </form>
                <div className={styles.auth_pattern}>
                    <img src={pattern}  />
                </div>
                <div className={styles.auth_title}>
                    <span>Уже регистрировались?</span>
                    <a href="#" onClick={() => handleRegisterOrAuth(true)}>Войти</a>
                </div>
                <div className={styles.reg_sign}>
                    <span>Войти через</span>
                    <img src={google} className={styles.sign_icon} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reg