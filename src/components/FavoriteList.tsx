import { useEffect, useState } from "react";
import nextArrow from "../assets/svgs/Vector (7).svg";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import Card from "./Card";
import "../styles/favorite.scss"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { fetchFavorites } from "../store/features/favorite_and_cart/favoriteSlice";

function FavoriteList() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const favoritesProducts = useSelector((state: RootStates) => state.favorites.favorites);
    const userString = localStorage.getItem("userInfo");
    const user = userString ? JSON.parse(userString) : null;
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

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

    const itemsPerPage = 16;
    const maxVisiblePages = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCards = favoritesProducts.slice(startIndex, endIndex);

    const totalPages = Math.ceil(favoritesProducts.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleNavigate = (id: number) => {
        navigate(`/product/${id}`)
    }

    const visiblePages = () => {
        const totalVisiblePages = Math.min(totalPages, maxVisiblePages);
        const start = Math.max(currentPage - Math.floor(totalVisiblePages / 2), 1);
        const end = Math.min(start + totalVisiblePages - 1, totalPages);

        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

  return (
    <>
       
        <div className="favorite">
            <div className="favorite_title">
                Избранное
            </div>
            <div className="favorite_clear">
                <span>Очистить список</span>
            </div>
        </div>
        <div className={isMobile ? "d-f__rec-product__mobile" : "d-f__rec-product"}>
            { currentCards.map((cardItem: any) => (
                <Card key={cardItem.id} product={cardItem} onClick={handleNavigate} />
            ) ) }
        </div>
        <div className="pagination">
        <div onClick={handlePrevPage} className={`prev__btn-pagination ${currentPage === 1 ? "disabled_pagination" : ""}`}>
          <img src={prevArrow} />
        </div>
        <div className="pagination__numbers">
            {visiblePages().map((page) => (
                <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`${currentPage === page ? "active-pagination" : ""} pagination__number`}
                >
                {page}
                </button>
            ))}
            </div>
            <div onClick={handleNextPage} className={`next__btn-pagination ${currentPage === totalPages ? "disabled_pagination" : ""}`}>
            <img src={nextArrow} />
            </div>
        </div>
    </>
  )
}

export default FavoriteList