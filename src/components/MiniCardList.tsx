import Slider from "react-slick";
import styles from "../styles/card.module.scss";
import MiniCard from "./MiniCard";

function MiniCardList() {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1  
      };
      return (
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
          </Slider>
        </div>
    );    
}

export default MiniCardList