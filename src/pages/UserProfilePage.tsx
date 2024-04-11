import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/auth.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { changeName } from "../store/features/auth/authSlice";
import 'ldrs/ring';
import { ping } from 'ldrs'

function UserProfilePage() {
  const userString = localStorage.getItem("userInfo");
  const user = userString ? JSON.parse(userString) : null;
  const navigate = useNavigate();
  const [ modifiedName, setModifiedName ] = useState(user.name);
  const [ editUser, setEditUser ] = useState(false);
  const [ loading, setLoading ] = useState(false);
  const dispatch = useDispatch<any>();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
}, []);

  ping.register();

  const handleChangeName = (e: any) => {
    const { value } = e.target;
    setModifiedName(value);
    console.log(modifiedName)
  }

  const currentUser = useSelector((state: RootStates) => state.auth.user);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  const handleSave = () => {
    setLoading(true);
    dispatch(changeName(modifiedName)).then(() => {
      setLoading(false);
      setEditUser(false);
    }).catch(() => {
      setLoading(false);
    });
  }


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
            { !user.name ? (
              null
            ) : (
              <li>Имя</li>
            ) }
            <li>Email</li>
            { !user.name ? (
              null
            ) : (
              <li>Телефон</li>
            ) }
          </div>
          <div className={styles.user_wrapper__right}>
            { !editUser ? (
              !user.name ? (
                null
              ) : (
                <li>{user?.name}</li>
              )
            ) : (
              <div className={styles.form_to_change}>
                {loading && (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                    Загрузка...
                  </div>
                )}
                { !loading && !isMobile ? (
                  <>
                    <input type="text" name="name" onChange={handleChangeName} value={modifiedName} className={styles.edit_name} />
                    <div className={styles.user_button} style={{ marginTop: "0px" }}>
                      <button onClick={handleSave}>Сохранить</button>
                    </div>
                  </>
                ) : null }
              </div>
            ) }
            <li>{user?.email}</li>
            <li>{ !user.name ? null : "+996" }</li>
          </div>
        </div>
        { !user.name ? (
          null
        ) : (
          <div className={styles.user_button} onClick={() => setEditUser(true)}>
            <button>Редактировать</button>
          </div>
        ) }
      </div>
      { isMobile && editUser ? (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
              { !loading ? (
                  <div className={styles.mobile_d_f}>
                    <input style={{ width: "max-content", height: "45px" }} type="text" name="name" onChange={handleChangeName} value={modifiedName} className={styles.edit_name} />
                    <div className={styles.user_button_mobile} style={{ marginTop: "20px" }}>
                      <button onClick={handleSave}>Сохранить</button>
                    </div>
                  </div>
              ) : null }
          </div>
      </div>
      ) : null } 
    </div>
  );
}

export default UserProfilePage;