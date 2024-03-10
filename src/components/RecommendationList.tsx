import { useEffect, useState } from "react";
import nextArrow from "../assets/svgs/Vector (7).svg";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecProducts } from "../store/features/products/productRecommenededSlice";
import { RootStates } from "../store/store";
import { useNavigate } from "react-router-dom";

function RecommendationList() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const recProducts = useSelector((state: RootStates) => state.productRec.rec_products);

    useEffect(() => {
        dispatch(fetchRecProducts())
    }, [dispatch])

    const itemsPerPage = 16;
    const maxVisiblePages = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(recProducts.length / itemsPerPage);

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
        <div className={"accessories"} style={{ margin: "50px 0px" }}>
            <div className="accessories__item">
            Рекомендуемые
            </div>
            <div className="accessories__item">
            <span style={{ fontSize: "25px", marginRight: "10px", display: "flex", justifyItems: "center", alignItems: "center" }}>Смотреть все</span>
            <div onClick={() => navigate("/recommendation/products")} className="accessories__item_img" style={{ position: "initial" }}>
                <img src={nextArrow} />
            </div>
            </div>
        </div>
        <div className="d-f__rec-product">
            { recProducts.map((product) => (
                <Card key={product.id} product={product} type={"recommedation_card"} onClick={handleNavigate} />
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

export default RecommendationList