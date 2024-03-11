import { useEffect } from "react";
import nextArrow from "../assets/svgs/Vector (7).svg";
import "../styles/homepage.scss";
import NewProductsCard from "./NewProductCard";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { fetchProducts } from "../store/features/products/productSlice";
import { ProductsType } from "../utils/interfacesAndTypes";
import { useNavigate } from "react-router-dom";

function NewProductsList() {

  const dispatch = useDispatch<any>();
  const products = useSelector((state: RootStates) => state.products.products);

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  const displayedProducts = products.slice(0, 4);

  const filteredNewProducts = displayedProducts.filter((item) => item.is_arrived === true);

  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`)
  }

  return (
    <>
        <div className={"accessories"} style={{ marginBottom: "30px" }}>
            <div className="accessories__item">
            Новое поступление
            </div>
            <div className="accessories__item">
            <span style={{ fontSize: "2vw", marginRight: "10px", display: "flex", justifyItems: "center", alignItems: "center" }}>Смотреть все</span>
            <div onClick={() => navigate("/new/products")} className="accessories__item_img" style={{ position: "initial" }}>
                <img src={nextArrow} />
            </div>
            </div>
        </div>
        <div className="d-f__new-product">
          {filteredNewProducts?.map((product: ProductsType, index: number) => (
            <NewProductsCard product={product} key={index} onClick={() => handleNavigate(product.id)} />
          ))}
        </div>
    </>
  )
}

export default NewProductsList