import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../styles/auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect, useState } from "react";
import pattern from "../assets/svgs/auth/pattern.svg";
import { newPasswordConfirm } from "../store/features/auth/authSlice";
import { notify } from "../components/Toastify";
import eye from "../assets/svgs/auth/eye.svg";
import showedEye from "../assets/svgs/auth/eye-svgrepo-com.svg";

function ConfirmWithPassword() {
    const [ searchParams ] = useSearchParams();
    const dispatch = useDispatch<any>();
    const urlParams = new URLSearchParams(window.location.search);

    const obj = {
      uid: urlParams.get('uid'),
      token: urlParams.get('token')
    }

    console.log(obj)

    const user = useSelector((state: RootStates) => state.auth.user);
    const navigate = useNavigate();

    const [errorAuth, setErrorAuth] = useState(false);
    const [loadedAuth, setLoadedAuth] = useState(false);
    const [ showPassword, setShowPassword ] = useState(false);

    const [authFormData, setAuthFormData] = useState({
        new_password: "",
    });

    useEffect(() => {
        console.log("User changed:", user);
    }, [user]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setAuthFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    };

    const handleResendLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoadedAuth(true);

        try {
            setErrorAuth(false);
            const new_obj = {
                uid: searchParams.get("uid"),
                token: searchParams.get("token"),
                new_password: authFormData.new_password
            }
            if (obj.uid !== null && obj.token !== null) {
                console.log(new_obj)
                dispatch(newPasswordConfirm(new_obj));
                console.log(obj, new_obj);
                navigate("/auth");
                notify("Теперь пройдите авторизацию с новым паролем")
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            setErrorAuth(true);
        }
    }

    return (
        <div className={styles.auth_main} style={{ marginTop: "30px" }}>
            <div className={styles.auth_container}>
                    <div className={styles.auth}>
                        <div className={styles.auth_text}>
                        <p>
                            Введите новый пароль
                        </p>
                        </div>
                        <form onSubmit={handleResendLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div className={styles.auth_form}>
                                <div className={styles.auth_input}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Ваш новый пароль"
                                        name="new_password"
                                        value={authFormData.new_password}
                                        onChange={handleInputChange}
                                    />
                                    <img src={showPassword ? showedEye : eye} onClick={() => setShowPassword(!showPassword)} className={styles.eye_svg} />
                                </div>
                            </div>
                            { errorAuth && (
                                <div className={styles.errors} style={{ marginTop: "10px" }}>
                                    Введите валидные данные!
                                </div>
                            ) }
                            <div className={styles.auth_button}>
                            { loadedAuth ? (
                                <div>Обработка данных...</div>
                            ) : (
                                <button className={`${styles.reg_button}`} disabled={loadedAuth}>
                                    Далее
                                </button>
                            ) }
                            </div>
                        </form>
                        <div className={styles.auth_pattern}>
                            <img src={pattern} />
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default ConfirmWithPassword
