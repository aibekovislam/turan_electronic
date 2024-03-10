import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneBrand } from '../store/features/brands/oneBrandSlice';
import { RootStates } from '../store/store';
import BrandFilterNavbar from '../components/BrandFilterNavbar';
import { fetchProducts } from '../store/features/products/productSlice';
import Card from '../components/Card';
import nextArrow from "../assets/svgs/Vector (7).svg";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import SidebarMenu from '../components/SidebarMenu';

function BrandsPage() {
    const { brand } = useParams();
    const dispatch = useDispatch<any>();
    const oneBrand = useSelector((state: RootStates) => state.oneBrand.brand);
    const products = useSelector((state: RootStates) => state.products.products);
    const colors = useSelector((state: RootStates) => state.products.colors);

    useEffect(() => {
        if(brand != undefined) {
            dispatch(fetchOneBrand(+brand))
            dispatch(fetchProducts())
        }
    }, [dispatch, brand])

    const filteredData = products?.filter((item) => item.brand_title === oneBrand?.title)
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

    if(oneBrand != undefined) {
        return (
            <>
                <BrandFilterNavbar brandImg={oneBrand?.logo_field} brandTitle={oneBrand?.title} products={filteredData} colors={colors} />
                <div className="d-f__rec-product" style={{ marginTop: "30px" }}>
                    { filteredData.map((product) => (
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
                <SidebarMenu/>
            </>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default BrandsPage