import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootStates } from "../store/store";
import { fetchRecProducts } from "../store/features/products/productRecommenededSlice";
import Card from "../components/Card";

function RecommendationProductsPage() {

    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const recProducts = useSelector((state: RootStates) => state.productRec.rec_products);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 520);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchRecProducts())
    }, [dispatch])

    const handleNavigate = (id: number) => {
        navigate(`/product/${id}`)
    }

    return (
        <div style={{ marginTop: "30px" }} >
            <div className={isMobile ? "d-f__rec-product__mobile" : "d-f__rec-product"}>
                { recProducts.map((product) => (
                    <Card key={product.id} product={product} type={"recommedation_card"} onClick={handleNavigate} />
                ) ) }
            </div>
        </div>
    )
}

export default RecommendationProductsPage