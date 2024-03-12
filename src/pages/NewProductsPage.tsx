import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { fetchProducts } from "../store/features/products/productSlice";
import { useNavigate } from "react-router-dom";
import "../styles/homepage.scss";
import NewProductsCard from "../components/NewProductCard";
import { ProductsType, default_filters } from "../utils/interfacesAndTypes";

function NewProductsPage() {
    const dispatch = useDispatch<any>();
    const products = useSelector((state: RootStates) => state.products.products);

    useEffect(() => {
        dispatch(fetchProducts(default_filters))
    }, [dispatch])

    const displayedProducts = products.slice(0, 4);

    const filteredNewProducts = displayedProducts.filter((item) => item.is_arrived === true);

    const navigate = useNavigate();

    const handleNavigate = (id: number) => {
        navigate(`/product/${id}`)
    }

    return (
        <div style={{ marginTop: "30px" }} >
            <div className="d-f__new-product">
                {filteredNewProducts?.map((product: ProductsType, index: number) => (
                    <NewProductsCard product={product} key={index} onClick={handleNavigate} />
                ))}
            </div>
        </div>
    )
}

export default NewProductsPage