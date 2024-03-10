import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootStates } from "../store/store";
import { fetchRecProducts } from "../store/features/products/productRecommenededSlice";
import Card from "../components/Card";

function RecommendationProductsPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const recProducts = useSelector((state: RootStates) => state.productRec.rec_products);

    useEffect(() => {
        dispatch(fetchRecProducts())
    }, [dispatch])

    const handleNavigate = (id: number) => {
        navigate(`/product/${id}`)
    }

    return (
        <div style={{ marginTop: "30px" }} >
            <div className="d-f__rec-product">
                { recProducts.map((product) => (
                    <Card key={product.id} product={product} type={"recommedation_card"} onClick={handleNavigate} />
                ) ) }
            </div>
        </div>
    )
}

export default RecommendationProductsPage