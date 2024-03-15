import styles from "../styles/auth.module.scss"
import pattern from "../assets/svgs/auth/pattern.svg"
import google from "../assets/svgs/auth/google.svg"
import eye from "../assets/svgs/auth/eye.svg"
import showedEye from "../assets/svgs/auth/eye-svgrepo-com.svg";
import { AuthAndRegProps } from "../utils/interfacesAndTypes"
import { useState } from "react"
import axios from "axios"
import { API_URL } from "../utils/consts"
import { useNavigate } from "react-router-dom"

function Reg({ handleRegisterOrAuth }: AuthAndRegProps) {
    const [loadedAuth, setLoadedAuth] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const [authFormData, setAuthFormData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuthFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoadedAuth(true);

            if (authFormData.password !== authFormData.confirmPassword) {
                setErrorAuth(true);
                return;
            }

            const { confirmPassword, ...requestData } = authFormData;

            const response = await axios.post(`${API_URL}/users/`, requestData);
            console.log(response.data);

            if (response.data) {
                navigate("/activate");
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
                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div className={styles.auth_form}>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} value={authFormData.name} type="text" name="name" placeholder="Имя"/>
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type={showPassword ? "text" : "password"} value={authFormData.password} name="password"  placeholder="Пароль"/>
                            <img src={showPassword ? showedEye : eye}  className={styles.eye_svg} onClick={() => setShowPassword(!showPassword)} />
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type={showConfirmPassword ? "text" : "password"} value={authFormData.confirmPassword} name="confirmPassword" placeholder="Потвердить пароль"/>
                            <img src={showPassword ? showedEye : eye} className={styles.eye_svg} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type="text" value={authFormData.email} name="email" placeholder="Ваш Email"/>
                        </div>
                        <div className={styles.conditions}>
                            <input type="checkbox" className={styles.checkbox_custom} />
                            <p>Я согласен с <a href="#">условиями обработки</a> <br/> персональных данных</p>
                        </div>
                    </div>
                    { errorAuth && (
                        <div className={styles.errors}>
                            Проверьте ваши данные пожалуйста
                        </div>
                    ) }
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