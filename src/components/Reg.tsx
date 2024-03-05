import styles from "../styles/auth.module.scss"
import pattern from "../assets/svgs/auth/pattern.svg"
import google from "../assets/svgs/auth/google.svg"
import eye from "../assets/svgs/auth/eye.svg"
import { AuthAndRegProps } from "../utils/interfacesAndTypes"

function Reg({ handleRegisterOrAuth }: AuthAndRegProps) {
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
                        <input type="text" placeholder="Имя"/>
                    </div>
                    <div className={styles.auth_input}>
                        <input type="password"  placeholder="Пароль"/>
                        <img src={eye}  className={styles.eye_svg} />
                    </div>
                    <div className={styles.auth_input}>
                        <input type="password"  placeholder="Потвердить пароль"/>
                        <img src={eye}  className={styles.eye_svg} />
                    </div>
                    <div className={styles.auth_input}>
                        <input type="text" placeholder="Email или телефон ..."/>
                    </div>
                    <div className={styles.conditions}>
                        <input type="checkbox" className={styles.checkbox_custom} />
                        <p>Я согласен с <a href="#">условиями обработки</a> <br/> персональных данных</p>
                    </div>
                </div>
                <div className={styles.auth_button}>
                    <button className={styles.reg_button}>
                        <a href="#">Регистрация</a>
                    </button>
                </div>
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