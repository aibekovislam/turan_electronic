import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/features/products/productSlice";
import { default_filters } from "../utils/interfacesAndTypes";
import "../styles/homepage.scss";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import nextArrow from "../assets/svgs/Vector (7).svg";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import { Helmet } from "react-helmet-async";

export default function SearchPage() {
    const dispatch = useDispatch<any>();
    const products = useSelector((state: RootStates) => state.products.products);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 520);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchProducts({
          ...default_filters,
          limit: 100
        }));
    }, [dispatch]);

    const navigate = useNavigate();

    const handleNavigate = (id: number) => {
        navigate(`/products/${id}`)
    }

    const itemsPerPage = 16;
    const maxVisiblePages = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const visiblePages = () => {
        const totalVisiblePages = Math.min(totalPages, maxVisiblePages);
        const start = Math.max(currentPage - Math.floor(totalVisiblePages / 2), 1);
        const end = Math.min(start + totalVisiblePages - 1, totalPages);

        return Array.from({ length: end - start + 1 }, (_, index) => start + index);
    };

    const getCurrentPageProducts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = products ? Math.min(startIndex + itemsPerPage, products.length) : 0;
        return products ? products.slice(startIndex, endIndex) : [];
    };

    const currentPageProducts = getCurrentPageProducts();

    const preventDefault = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
    };

    return (
        <>
            <Helmet>
                <title>Поиск - Turan electronics</title>
                <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"/>
                <link rel="canonical" href={`https://turanelectronics.kg/search`} />
            </Helmet>
            <div className={"accessories"} style={{ margin: !isMobile ? "30px 0px" : "0px 0px 20px" }}>
            </div>
            <div className={isMobile ? "d-f__rec-product__mobile" : "d-f__rec-product"} style={{ justifyContent: "space-between" }}>
                {currentPageProducts.map((product) => (
                    <Card key={product.id} product={product} type={"recommedation_card"} onClick={handleNavigate} />
                ))}
            </div>
            <div className="pagination">
                <div onClick={(e: any) => { handlePrevPage(); preventDefault(e); }} className={`prev__btn-pagination ${currentPage === 1 ? "disabled_pagination" : ""}`}>
                    <img src={prevArrow} />
                </div>
                <div className="pagination__numbers">
                    {visiblePages().map((page) => (
                        <button
                            key={page}
                            onClick={(e) => { handlePageChange(page); preventDefault(e); }}
                            className={`${currentPage === page ? "active-pagination" : ""} pagination__number`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
                <div onClick={(e: any) => { handleNextPage(); preventDefault(e); }} className={`next__btn-pagination ${currentPage === totalPages ? "disabled_pagination" : ""}`}>
                    <img src={nextArrow} />
                </div>
            </div>
        </>
    )
}
