import styles from "../styles/auth.module.scss"
import pattern from "../assets/svgs/auth/pattern.svg"
import google from "../assets/svgs/auth/google.svg"
// import eye from "../assets/svgs/auth/eye.svg"



function RegConfiirm() {
  return (
    <div className={styles.auth_main}>     
        <div className={styles.auth_container}>
            <div className={styles.auth}>
                <div className={styles.auth_text}>
                    <p>
                        Авторизуйтесь, указав свои контактные данные, или <br/> воспользовавшись перечисленными сервисами
                    </p>
                </div>
                <div className={styles.auth_sign}>
                    <img src={google} className={styles.sign_icon} />
                </div>
                <div className={styles.auth_pattern}>
                    <img src={pattern}  />
                </div>
                <div className={styles.reg__confirm_text}>
                    <p>
                         На номер телефона (070) 509-00-07 отправлено SMS-сообщение <br/> для подтверждения регистрации.
                    </p>
                </div>
                <div className={styles.auth_form}>
                    <div className={styles.auth_input}>
                        <input type="text" placeholder="Проверочный код"/>
                    </div>
                </div>
                <div className={styles.reg__confirm_text}>
                    <p>
                    Вы можете запросить код через 00:28.
                    </p>
                </div>
                <div className={styles.auth_button}>
                    <button className={styles.button}>
                        <a href="#">Потвердить</a>
                    </button>
                </div>
                
                
                
            </div>
        </div>
    </div>
  )
}

export default RegConfiirm