import nextArrow from "../assets/svgs/Vector (7).svg";
import "../styles/homepage.scss";
import NewProductsCard from "./NewProductCard";

function NewProductsList() {
  return (
    <>
        <div className={"accessories"} style={{ marginBottom: "30px" }}>
            <div className="accessories__item">
            Новое поступление
            </div>
            <div className="accessories__item">
            <span style={{ fontSize: "2vw", marginRight: "10px", display: "flex", justifyItems: "center", alignItems: "center" }}>Смотреть все</span>
            <div className="accessories__item_img" style={{ position: "initial" }}>
                <img src={nextArrow} />
            </div>
            </div>
        </div>
        <div className="d-f__new-product">
            <NewProductsCard/>
            <NewProductsCard/>
            <NewProductsCard/>
            <NewProductsCard/>
        </div>
    </>
  )
}

export default NewProductsList