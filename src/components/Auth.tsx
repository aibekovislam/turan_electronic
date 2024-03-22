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

function Auth({ handleRegisterOrAuth }: AuthAndRegProps): JSX.Element {
  const user = useSelector((state: RootStates) => state.auth.user);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const [authFormData, setAuthFormData] = useState({
    email: "",
    password: "",
  });
  const [errorAuth, setErrorAuth] = useState(false);
  const [loadedAuth, setLoadedAuth] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

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
  

  if(user) {
    navigate("/")
    notify('Вы успешно вошли в аккаунт')
  }

  return (
    <div className={styles.auth_main}>
      <div className={styles.auth_container}>
        <div className={styles.auth}>
          <div className={styles.auth_text}>
            <p>
              Авторизуйтесь, указав свои контактные данные, или <br /> воспользовавшись перечисленными сервисами
            </p>
          </div>
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
              <div className={styles.auth_input}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  name="password"
                  value={authFormData.password}
                  onChange={handleInputChange}
                />
                <img src={showPassword ? showedEye : eye} onClick={() => setShowPassword(!showPassword)} className={styles.eye_svg} />
              </div>
              <div className={styles.forgotten_password} onClick={() => navigate("/resend/auth")}>
                <span>Забыли пароль?</span>
              </div>
            </div>
            { errorAuth && (
              <div className={styles.errors} style={{ marginTop: "10px" }}>
                Проверьте ваши данные пожалуйста
              </div>
            ) }
              <div className={styles.auth_button}>
                { loadedAuth ? (
                  <div>Обработка данных...</div>
                ) : (
                  <button className={`${styles.reg_button}`} disabled={loadedAuth}>
                    Войти
                  </button>
                ) }
              </div>
          </form>
          <div className={styles.auth_title}>
            <span>Впервые у нас?</span>
            <a href="#" onClick={() => handleRegisterOrAuth(false)}>
              Регистрация
            </a>
          </div>
          <div className={styles.auth_pattern}>
            <img src={pattern} />
          </div>
          <div className={styles.auth_sign}>
            <span>Войти через</span>
            <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=466150715276-pqd48j63eqpcms86v18vk0ima54lhjsv.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fturan-backend.online%2Faccounts%2Fgoogle%2Flogin%2Fcallback%2F&scope=profile%20email&response_type=code&state=HGgwBtAjOy23JNK7&access_type=online&service=lso&o2v=2&theme=mn&ddm=0&flowName=GeneralOAuthFlow">
              <img src={google} className={styles.sign_icon} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;