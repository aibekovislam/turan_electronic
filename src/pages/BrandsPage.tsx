import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneBrand } from '../store/features/brands/oneBrandSlice';
import { RootStates } from '../store/store';
import BrandFilterNavbar from '../components/BrandFilterNavbar';
import { fetchFilterProducts, fetchProducts } from '../store/features/products/productSlice';
import Card from '../components/Card';
import nextArrow from "../assets/svgs/Vector (7).svg";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import { default_filters } from '../utils/interfacesAndTypes';

function BrandsPage() {
    const { brand } = useParams();
    const dispatch = useDispatch<any>();
    const oneBrand = useSelector((state: RootStates) => state.oneBrand.brand);
    const products = useSelector((state: RootStates) => state.products.products);
    const colors = useSelector((state: RootStates) => state.products.colors);
    const filteredProducts = useSelector((state: RootStates) => state.products.filteredProducts);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 520);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(brand != undefined) {
            dispatch(fetchOneBrand(+brand))
        }
        dispatch(fetchProducts(default_filters));
    }, [dispatch, brand]) 

    useEffect(() => {
        if(oneBrand !== null) {
            dispatch(fetchFilterProducts({
                limit: 10,
                offset: 0,
                min_price: undefined,
                max_price: undefined,
                brand: oneBrand?.id,
                product_color: [],
                memory: [],
                product_name: ""
            }))
        }
    }, [dispatch])
    
    const filteredData = products?.filter((item) => item.brand === oneBrand?.id)

    const navigate = useNavigate();
    const itemsPerPage = 16;
    const maxVisiblePages = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / itemsPerPage);

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

    if(oneBrand != undefined && filteredProducts !== undefined) {
        return (
            <>
                <BrandFilterNavbar brand={oneBrand} products={filteredData} colors={colors} />
                <div className={isMobile ? "d-f__rec-product__mobile" : "d-f__rec-product"} style={{ marginTop: "30px" }}>
                { filteredProducts?.length !== 0 ? (
                    filteredProducts?.map((product: any) => (
                        <Card key={product.id} product={product} type={"recommedation_card"} onClick={handleNavigate} />
                    ))
                ) : (
                    filteredData?.map((product: any) => (
                        <Card key={product.id} product={product} type={"recommedation_card"} onClick={handleNavigate} />
                    ))
                ) }
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
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default BrandsPage