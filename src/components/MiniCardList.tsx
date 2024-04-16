import Slider from "react-slick";
import styles from "../styles/card.module.scss";
import MiniCard from "./MiniCard";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import nextArrow from "../assets/svgs/Vector (7).svg";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect, useState } from "react";
import { fetchAccessories } from "../store/features/accessories/accessoriesSlice";
import { AccessoriesType } from "../utils/interfacesAndTypes";
import { useNavigate } from "react-router-dom";
import MiniCardMobile from "./MiniCardMobile";

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 520);


  useEffect(() => {
      dispatch(fetchAccessories())
  }, [dispatch])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 520);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);



    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4.5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        swipe: true,
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

      const navigate = useNavigate();

      const handleNavigate = (id: number) => {
        navigate(`/product/${id}`)
      }
      
      return (
        <>
          <div className={"accessories"}>
            <div className="accessories__item">
              Аксессуары
            </div>
          </div>
          <div className={`slider-container ${styles.mini_card_list}`}>
            <Slider {...settings}>
              { accessories.length !== 0 ? (
                accessories?.map((accessory: AccessoriesType, index: number) => (
                  isMobile ? (
                    <MiniCardMobile key={index} accessories={accessory} onClick={() => accessory?.id && handleNavigate(accessory.id)} />
                  ) : (
                  <div key={index} className={styles.mini_card_block}>
                    <MiniCard accessories={accessory} onClick={() => accessory?.id && handleNavigate(accessory.id)} style={{ cursor: "pointer" }} />
                  </div>
                  )
                ))
              ) : (
                <div>loading...</div>
              ) }
            </Slider>
          </div>
        </>
    );    
}

export default MiniCardList