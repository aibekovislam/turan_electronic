import styles from "../styles/auth.module.scss";
import pattern from "../assets/svgs/auth/pattern.svg";
import google from "../assets/svgs/auth/google.svg";
import eye from "../assets/svgs/auth/eye.svg";
import showedEye from "../assets/svgs/auth/eye-svgrepo-com.svg";
import { AuthAndRegProps } from "../utils/interfacesAndTypes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/features/auth/authSlice";
import { RootStates } from "../store/store";
import { useNavigate } from "react-router-dom";
import { notify } from "./Toastify";
import { useTranslation } from "react-i18next";

function Auth({ handleRegisterOrAuth }: AuthAndRegProps): JSX.Element {
  const user = useSelector((state: RootStates) => state.auth.user);
  const userString = localStorage.getItem("userInfo");
  const userLocal = userString ? JSON.parse(userString) : null;
  const tokenString = localStorage.getItem("tokens");
  const token = tokenString ? JSON.parse(tokenString) : null;
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [authFormData, setAuthFormData] = useState({
    email: "",
    password: "",
  });
  const [errorAuth, setErrorAuth] = useState(false);
  const [loadedAuth, setLoadedAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadedAuth(true);

    try {
      await dispatch(signIn(authFormData));
      setErrorAuth(false);
    } catch (error) {
      console.error("Error during authentication:", error);
      setErrorAuth(true);
    } finally {
      setLoadedAuth(false);
    }
  };


  useEffect(() => {
    if (userLocal && token) {
      navigate("/")
      notify(t("sign_message"))
    }
  }, [userLocal])

  return (
    <div className={styles.auth_main}>
      <div className={styles.auth_container}>
        <div className={styles.auth}>
          <div className={styles.auth_text} style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ maxWidth: "500px" }}>
              { t("auth_text") }
            </p>
          </div>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div className={styles.auth_form}>
              <div className={styles.auth_input}>
                <input
                  type="text"
                  placeholder={t("input_email")}
                  name="email"
                  value={authFormData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.auth_input}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("input_password")}
                  name="password"
                  value={authFormData.password}
                  onChange={handleInputChange}
                />
                <img alt="eye" src={showPassword ? showedEye : eye} onClick={() => setShowPassword(!showPassword)} className={styles.eye_svg} />
              </div>
              <div className={styles.forgotten_password} onClick={() => navigate("/resend/auth")}>
                <span>{t("forgot_password")}</span>
              </div>
            </div>
            {errorAuth && (
              <div className={styles.errors} style={{ marginTop: "10px" }}>
                { t("auth_check") }
              </div>
            )}
            <div className={styles.auth_button}>
              {loadedAuth ? (
                <div>{ t("auth_loading") }...</div>
              ) : (
                <button className={`${styles.reg_button}`} disabled={loadedAuth}>
                  { t("sign_in") }
                </button>
              )}
            </div>
          </form>
          <div className={styles.auth_title}>
            <span>{ t("new_in_site") }</span>
            <a href="#" onClick={() => handleRegisterOrAuth(false)}>
              { t("reg") }
            </a>
          </div>
          <div className={styles.auth_pattern}>
            <img alt="pattern" src={pattern} />
          </div>
          <div className={styles.auth_sign}>
            <span>{ t("sign_through") }</span>
            <a href="https://turan-backend.online/google/login/">
              <img alt="google svg" src={google} className={styles.sign_icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;