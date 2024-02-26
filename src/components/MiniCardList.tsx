import Slider from "react-slick";
import styles from "../styles/card.module.scss";
import MiniCard from "./MiniCard";
import { useState } from "react";

function MiniCardList() {
    const settings = {
        // className: "slider variable-width",
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false
      };
      return (
        <div className={`slider-container ${styles.mini_card_list}`}>
          <Slider {...settings}>
            <div className={styles.mini_card_block}>
              <MiniCard/>
            </div>
            <div className={styles.mini_card_block}>
                <MiniCard/>
            </div>
            <div className={styles.mini_card_block}>
                <MiniCard/>
            </div>
            <div className={styles.mini_card_block}>
                <MiniCard/>
            </div>
            <div className={styles.mini_card_block}>
                <MiniCard/>
            </div>
            <div className={styles.mini_card_block}>
                <MiniCard/>
            </div>
          </Slider>
        </div>
    );    
}

export default MiniCardList