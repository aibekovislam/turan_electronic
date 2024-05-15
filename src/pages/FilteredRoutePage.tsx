import { useNavigate, useParams } from "react-router-dom"
import { RootStates } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFilterProducts, getProductsByBrandCategory, getProductsByOneBrand } from "../store/features/products/productSlice";
import Card from "../components/Card";
import BrandFilterNavbar from "../components/BrandFilterNavbar";
import 'ldrs/ring';
import { ping } from 'ldrs'
import { fetchOneBrand } from "../store/features/brands/oneBrandSlice";
import { ProductsType } from "../utils/interfacesAndTypes";
import { Helmet } from "react-helmet-async";

function FilteredRoutePage() {
    const { brand_category_title ,brand } = useParams();
    const products = useSelector((state: RootStates) => state.products.filteredProducts);
    const dispatch = useDispatch<any>();
    const oneBrand = useSelector((state: RootStates) => state.oneBrand.brand);
    const filteredProducts = useSelector((state: RootStates) => state.products.filteredProducts);
    const productsByBrandCategory = useSelector((state: RootStates) => state.products.filterByBrandCategory);

    useEffect(() => {
        dispatch(fetchFilterProducts({
            brand_category: brand_category_title
        }))
    }, [dispatch])

    const navigate = useNavigate();

    const handleNavigate = (id: number) => {
        navigate(`/products/${id}`)
    }

    ping.register();

    useEffect(() => {
        if(brand != undefined) {
            dispatch(fetchOneBrand(+brand))
        }
    }, [dispatch, brand]) 

    useEffect(() => {
        if(brand != undefined) {
            dispatch(getProductsByOneBrand({
                brand: Number(brand)
            }))
        }
    }, [dispatch])

    useEffect(() => {
        if(brand != undefined) {
            dispatch(getProductsByBrandCategory({
                brand: Number(brand)
            }))
        }
    }, [dispatch])

        if(oneBrand) {
            return (
                <>
                    <Helmet>
                        <title>Товары: {`${oneBrand.title} - Turan electronics`}</title>
                        <meta name="description" content="Интернет магазин Turan Electronics KG, интернет магазин для электроники в Кыргызстане, вы можете купить любой товар начиная Google Pixel заканчивая Apple Iphone и Dyson"></meta>
                        <link rel="canonical" href={`https://turanelectronics.kg/products/filter/${oneBrand.title}/:${oneBrand.id}`} />
                    </Helmet>
                    <div style={{ marginTop: "30px" }}>
                        { filteredProducts?.length !== 0 ? (
                            <>
                                <BrandFilterNavbar brand={oneBrand} products={filteredProducts} dataForDropDown={products} productsByBrandCategory={productsByBrandCategory} />
                                <div className="d-f__rec-product" style={{ marginTop: "30px" }}>
                                    { filteredProducts?.map((product: ProductsType, index: number) => (
                                        <Card onClick={handleNavigate} product={product} key={index} type="recommedation_card" />
                                    )) }
                                </div>
                            </>
                        ) : (
                            <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                        ) }
                    </div>
                </>
            )
        }
}

export default FilteredRoutePage