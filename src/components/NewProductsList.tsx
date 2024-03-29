import { useEffect, useState } from "react";
import nextArrow from "../assets/svgs/Vector (7).svg";
import "../styles/homepage.scss";
import NewProductsCard from "./NewProductCard";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { fetchProducts } from "../store/features/products/productSlice";
import { ProductsType, default_filters } from "../utils/interfacesAndTypes";
import { useNavigate } from "react-router-dom";

function NewProductsList() {

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

  useEffect(() => {
    dispatch(fetchProducts({
      ...default_filters,
      limit: 100
    }))
  }, [dispatch])

  const sortedProducts = products?.slice().sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA;
  });

  const filteredNewProducts = sortedProducts?.filter((item) => item.is_arrived === true);

  const displayedProducts = filteredNewProducts?.slice(0, 4);

  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/product/${id}`)
  }

  console.log(filteredNewProducts)

  return (
    <>
        <div className={"accessories"} style={{ marginBottom: "30px" }}>
            <div className="accessories__item">
            Новое поступление
            </div>
            <div className="accessories__item">
            <span onClick={() => navigate("/new/products")} style={{ fontSize: "2vw", marginRight: "10px", display: "flex", justifyItems: "center", alignItems: "center" }}>Смотреть все</span>
            <div onClick={() => navigate("/new/products")} className="accessories__item_img" style={{ position: "initial" }}>
                <img src={nextArrow} />
            </div>
            </div>
        </div>
        <div className={isMobile ? "d-f__new-product__mobile" : "d-f__new-product"}>
          {displayedProducts?.map((product: ProductsType, index: number) => (
            <NewProductsCard product={product} key={index} onClick={() => handleNavigate(product.id)} />
          ))}
        </div>
    </>
  )
}

export default NewProductsList