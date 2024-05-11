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
import { notifyError } from "./Toastify";
import { useTranslation } from "react-i18next";

function Reg({ handleRegisterOrAuth }: AuthAndRegProps) {
    const [loadedAuth, setLoadedAuth] = useState(false);
    const [errorAuth, setErrorAuth] = useState(false);
    const [ errorWithPassWord, setErrorWithPassword ] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    const { t } = useTranslation();

    const [authFormData, setAuthFormData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    const handleAgreementChange = () => {
        setIsAgreed(!isAgreed);
    };

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

            if (authFormData.password.length < 8 || /^\D+$/.test(authFormData.password)) {
                setErrorWithPassword(true);
                notifyError(t("auth_error1"))
                return;
            }    

            if (!isAgreed) {
                notifyError(t("auth_error2"));
                return;
            }

            const { confirmPassword, ...requestData } = authFormData;

            const response = await axios.post(`${API_URL}/users/`, requestData);
            console.log(response.data);

            if (response.data) {
                navigate("/activate");
            }
        } catch (error: any) {
            if (error.response && error.response.data.email[0] === "custom user with this email already exists.") {
                notifyError(t("auth_error3"));
            }
            console.log(error);
        } finally {
            setLoadedAuth(false);
        }
    };

  return (
    <div className={styles.auth_main}>     
        <div className={styles.auth_container}>
            <div className={styles.auth}>
                <div className={styles.auth_text} style={{ display: "flex", justifyContent: "center" }}>
                    <p style={{maxWidth: "500px"}}>
                        { t("auth_text") }
                    </p>
                </div>
                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div className={styles.auth_form}>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} value={authFormData.name} type="text" name="name" placeholder={t("input_name")}/>
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type={showPassword ? "text" : "password"} value={authFormData.password} name="password"  placeholder={t("input_password")} className={`${errorWithPassWord ? styles.error_password : ""}`}/>
                            <img src={showPassword ? showedEye : eye}  className={styles.eye_svg} onClick={() => setShowPassword(!showPassword)} />
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type={showConfirmPassword ? "text" : "password"} value={authFormData.confirmPassword} name="confirmPassword" placeholder={t("input_confirm_password")} className={`${errorWithPassWord ? styles.error_password : ""}`}/>
                            <img src={showConfirmPassword ? showedEye : eye} className={styles.eye_svg} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
                        </div>
                        <div className={styles.auth_input}>
                            <input onChange={handleInputChange} type="text" value={authFormData.email} name="email" placeholder={t("input_email")}/>
                        </div>
                        <div className={styles.conditions}>
                            <input type="checkbox" checked={isAgreed} onChange={handleAgreementChange} className={styles.checkbox_custom} />
                            <p style={{ maxWidth: "300px", width: "200px" }}>{ t("policy") }</p>
                        </div>
                    </div>
                    { errorAuth && (
                        <div className={styles.errors}>
                            { t("auth_check") }
                        </div>
                    ) }
                    <div className={styles.auth_button}>
                        { loadedAuth ? (
                            <div>{ t("auth_loading") }...</div>
                        ) : (
                            <button className={`${styles.reg_button}`} disabled={loadedAuth}>
                                { t("reg") }
                            </button>
                        ) }
                    </div>
                </form>
                <div className={styles.auth_pattern}>
                    <img src={pattern}  />
                </div>
                <div className={styles.auth_title}>
                    <span>{ t("in_reg") }</span>
                    <a href="#" onClick={() => handleRegisterOrAuth(true)}>{ t("sign_in") }</a>
                </div>
                <div className={styles.reg_sign}>
                    <span>{ t("sign_through") }</span>
                    <a href="https://turan-backend.online/google/login/">
                        <img src={google} className={styles.sign_icon} />
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reg