import Slider from "react-slick";
import styles from "../styles/card.module.scss";
import MiniCard from "./MiniCard";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import nextArrow from "../assets/svgs/Vector (7).svg";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { fetchAccessories } from "../store/features/accessories/accessoriesSlice";
import { AccessoriesType } from "../utils/interfacesAndTypes";

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={`accessories__item_img_prev ${className}`} style={{...style, left: "92%"}} onClick={onClick}>
      <img src={prevArrow} />
     </div>
  );
}

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
      <div className={`accessories__item_img ${className}`} style={{...style, right: "1%"}} onClick={onClick}>
        <img src={nextArrow} />
      </div>
  );
} 

function MiniCardList() {
  const dispatch = useDispatch<any>()
  const accessories = useSelector((state: RootStates) => state.accessories.accessories)

  useEffect(() => {
      dispatch(fetchAccessories())
  }, [dispatch])

  console.log(accessories, "Accessories");


    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4.5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3.5,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2.5,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2.2,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <>
          <div className={"accessories"}>
            <div className="accessories__item">
              Аксессуары
            </div>
          </div>
          <div className={`slider-container ${styles.mini_card_list}`}>
            <Slider {...settings}>
              {accessories?.map((accessories: AccessoriesType, index: number) => (
                <div key={ index } className={styles.mini_card_block}>
                  <MiniCard accessories={accessories}/>
                </div>
              ))}
            </Slider>
          </div>
        </>
    );    
}

export default MiniCardList