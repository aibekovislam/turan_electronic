import { useNavigate, useParams } from "react-router-dom"
import { RootStates } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFilterProducts, getProductsByBrandCategory, getProductsByOneBrand } from "../store/features/products/productSlice";
import Card from "../components/Card";
import BrandFilterNavbar from "../components/BrandFilterNavbar";
import 'ldrs/ring';
import { ping } from 'ldrs'
import { fetchOneBrand } from "../store/features/brands/oneBrandSlice";
import { ProductsType } from "../utils/interfacesAndTypes";

function FilteredRoutePage() {
    const { brand_category_title ,brand } = useParams();
    const products = useSelector((state: RootStates) => state.products.filteredProducts);
    const dispatch = useDispatch<any>();
    const oneBrand = useSelector((state: RootStates) => state.oneBrand.brand);
    const filteredProducts = useSelector((state: RootStates) => state.products.filteredProducts);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);
    const productsBrand = useSelector((state: RootStates) => state.products.filterByBrand);
    const productsByBrandCategory = useSelector((state: RootStates) => state.products.filterByBrandCategory);

    useEffect(() => {
        dispatch(fetchFilterProducts({
            brand_category: brand_category_title
        }))
    }, [dispatch])

    const navigate = useNavigate();

    const handleNavigate = (id: number) => {
        navigate(`/product/${id}`)
    }

    ping.register();

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
        // dispatch(fetchFilterProducts(
        //     {
        //         limit: 100,
        //         offset: 0,
        //         min_price: undefined,
        //         max_price: undefined,
        //         brand: Number(brand),
        //         product_color: [],
        //         memory: [],
        //         product_name: ""
        //     }
        // ));
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

    console.log(filteredProducts)

        if(oneBrand) {
            return (
                <div style={{ marginTop: "30px" }}>
                    <BrandFilterNavbar brand={oneBrand} products={filteredProducts} dataForDropDown={products} productsByBrandCategory={productsByBrandCategory} />
                    <div className="d-f__rec-product" style={{ marginTop: "30px" }}>
                        { filteredProducts?.map((product: ProductsType, index: number) => (
                            <Card onClick={handleNavigate} product={product} key={index} type="recommedation_card" />
                        )) }
                    </div>
                </div>
            )
        }
}

export default FilteredRoutePage