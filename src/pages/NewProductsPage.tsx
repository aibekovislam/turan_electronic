import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/features/products/productSlice";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.scss";
import NewProductsCard from "../components/NewProductCard";
import { ProductsType, default_filters } from "../utils/interfacesAndTypes";
import nextArrow from "../assets/svgs/Vector (7).svg";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import { Helmet } from "react-helmet-async";

function NewProductsPage() {
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

    const itemsPerPage = 16;
    const maxVisiblePages = 3;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchProducts({
            ...default_filters,
            limit: 100,
        }))
    }, [dispatch])
    
    const filteredNewProducts = products?.filter((item) => item.is_arrived === true);

    const totalPages = filteredNewProducts ? Math.ceil(filteredNewProducts.length / itemsPerPage) : 0;

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
        const endIndex = filteredNewProducts ? Math.min(startIndex + itemsPerPage, filteredNewProducts.length) : 0;
        return filteredNewProducts ? filteredNewProducts.slice(startIndex, endIndex) : [];
    };

    const currentPageProducts = getCurrentPageProducts();

    const navigate = useNavigate();

    const handleNavigate = (id: number) => {
        navigate(`/products/${id}`)
    }

    const preventDefault = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
    };

    return (
        <>
            <Helmet>
                <title>Новые товары - Turan electronics</title>
                <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
                <link rel="canonical" href={`https://turanelectronics.kg/new/products`} />
            </Helmet>
            <div style={{ marginTop: "30px" }} >
                <div className={isMobile ? "d-f__new-product__mobile" : "d-f__new-product"}>
                    {currentPageProducts?.map((product: ProductsType, index: number) => (
                        <NewProductsCard product={product} key={index} onClick={handleNavigate} />
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
            </div>
        </>
    )
}

export default NewProductsPage