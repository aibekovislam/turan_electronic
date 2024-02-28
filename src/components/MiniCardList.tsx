import Slider from "react-slick";
import styles from "../styles/card.module.scss";
import MiniCard from "./MiniCard";
import prevArrow from "../assets/svgs/mingcute_arrow-right-line.svg";
import nextArrow from "../assets/svgs/Vector (7).svg";

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={`accessories__item_img ${className}`} style={{...style, left: "92%"}} onClick={onClick}>
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
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4.5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
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
              <div className={styles.mini_card_block}>
                <MiniCard style={{ "boxShadow": "none" }}/>
              </div>
              <div className={styles.mini_card_block}>
                  <MiniCard style={{ "boxShadow": "none" }}/>
              </div>
              <div className={styles.mini_card_block}>
                  <MiniCard style={{ "boxShadow": "none" }}/>
              </div>
              <div className={styles.mini_card_block}>
                  <MiniCard style={{ "boxShadow": "none" }}/>
              </div>
              <div className={styles.mini_card_block}>
                  <MiniCard style={{ "boxShadow": "none" }}/>
              </div>
              <div className={styles.mini_card_block}>
                  <MiniCard style={{ "boxShadow": "none" }}/>
              </div>
              <div className={styles.mini_card_block}>
                  <MiniCard style={{ "boxShadow": "none" }}/>
              </div>
              <div className={styles.mini_card_block}>
                  <MiniCard style={{ "boxShadow": "none" }}/>
              </div>
            </Slider>
          </div>
        </>
    );    
}

export default MiniCardList