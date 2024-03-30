import { useNavigate, useParams } from "react-router-dom"
import { RootStates } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFilterProducts } from "../store/features/products/productSlice";
import { ProductsType } from "../utils/interfacesAndTypes";
import Card from "../components/Card";

function FilteredRoutePage() {
    const { brand_category_title } = useParams();
    const products = useSelector((state: RootStates) => state.products.filteredProducts);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        dispatch(fetchFilterProducts({
            brand_category: brand_category_title
        }))
    }, [dispatch])

    const navigate = useNavigate();

    const handleNavigate = (id: number) => {
        navigate(`/product/${id}`)
    }

    return (
        <div style={{ marginTop: "30px" }}>
            <div className="d-f__rec-product">
                { products?.map((product: ProductsType, index: number) => (
                    <Card onClick={handleNavigate} product={product} key={index} type="recommedation_card" />
                )) }
            </div>
        </div>
    )
}

export default FilteredRoutePage