import { useEffect, useState } from "react";
import Card from "./Card";
import "../styles/favorite.scss"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { clearFavorites, fetchFavorites } from "../store/features/favorite_and_cart/favoriteSlice";
import 'ldrs/ring';
import { ping } from 'ldrs'

function FavoriteList() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const favoritesProducts = useSelector((state: RootStates) => state.favorites.favorites);
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
    const [ loaded, setLoaded ] = useState(false);

    ping.register();

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 520);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchFavorites())
    }, [dispatch])

    if(!user) {
        return (
            <div className="not_auth">
                Вы не авторизованы
                <button onClick={() => navigate("/auth")}>Авторизоваться</button>
            </div>
        )
    }

    const handleNavigate = (id: number) => {
        navigate(`/product/${id}`)
    }

    useEffect(() => {
        if(favoritesProducts.length !== 0) {
            setLoaded(false);
        }
    }, [favoritesProducts])

  return (
    <>
       
        <div className="favorite">
            <div className="favorite_title">
                Избранное
            </div>
            { favoritesProducts?.length !== 0 ? (
                !loaded ? (
                    <div className="favorite_clear" onClick={() => {
                        setLoaded(true)
                        dispatch(clearFavorites())
                    }}>
                        <span>Очистить список</span>
                    </div>
                ) : (
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                    </div>
                )
            ) : (
                null
            ) }
        </div>
        { favoritesProducts?.length !== 0 && user ? (
            <>
                <div className={isMobile ? "d-f__rec-product__mobile" : "d-f__rec-product"}>
                    { favoritesProducts.map((cardItem: any) => (
                        <Card key={cardItem.id} product={cardItem} onClick={handleNavigate} />
                    ) ) }
                </div>
            </>
        ) : (
            <div className="empty_favorites" >
                Пусто
            </div>
        ) }
    </>
  )
}

export default FavoriteList