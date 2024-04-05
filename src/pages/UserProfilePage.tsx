import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/auth.module.scss";
import { useSelector } from "react-redux";
import { RootStates } from "../store/store";

function UserProfilePage() {
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();

  const currentUser = useSelector((state: RootStates) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  return (
    <div className={styles.user_main}>
      <div className={styles.section_title}>
        <div className={styles.path}>
          <span onClick={() => navigate("/")}>Главная /</span> <span onClick={() => navigate("/profile")} >Мой профиль</span>
        </div>
      </div>
      <div className={styles.user_title}>
        <div>Мой профиль</div>
      </div>
      <div className={styles.user_container}>
        <div className={styles.user}>
          <div className={styles.user_wrapper__left}>
            <li>Имя</li>
            <li>Email</li>
            <li>Телефон</li>
          </div>
          <div className={styles.user_wrapper__right}>
            <li>{user?.name}</li>
            <li>{user?.email}</li>
            <li>+996</li>
          </div>
        </div>
        <div className={styles.user_button}>
          <button>Редактировать</button>
        </div>
      </div>
    </div>
  );
}

export default UserProfilePage;
