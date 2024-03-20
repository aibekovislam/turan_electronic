import { useNavigate } from "react-router-dom";
import styles from "../styles/auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect, useState } from "react";
import pattern from "../assets/svgs/auth/pattern.svg";
import { resendAuth } from "../store/features/auth/authSlice";

function ResendAuth() {
    const dispatch = useDispatch<any>();
    const user = useSelector((state: RootStates) => state.auth.user);
    const navigate = useNavigate();

    const [errorAuth, setErrorAuth] = useState(false);
    const [loadedAuth, setLoadedAuth] = useState(false);

    const [authFormData, setAuthFormData] = useState({
        email: "",
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
            await dispatch(resendAuth(authFormData));
            navigate("/activate/resend")
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
                        Введите ваш email, для подтверждение аккаунта
                    </p>
                    </div>
                    <form onSubmit={handleResendLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <div className={styles.auth_form}>
                            <div className={styles.auth_input}>
                                <input
                                    type="text"
                                    placeholder="Ваш email"
                                    name="email"
                                    value={authFormData.email}
                                    onChange={handleInputChange}
                                />
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

export default ResendAuth