import Slider from "react-slick";
import prevArrowSVG from "../assets/svgs/Vector (5).svg";
import nextArrowSVG from "../assets/svgs/Vector (6).svg";
import styles from "../styles/slider.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect } from "react";
import { fetchCarousel } from "../store/features/carousel/carouselSlice";
import {  CarouselType } from "../utils/interfacesAndTypes";

function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <img src={nextArrowSVG} className={className} style={{ ...style, position: "absolute", right: "20px" }} onClick={onClick} />
    );
  }
  
function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
        <img src={prevArrowSVG} className={className} style={{ ...style, position: "absolute", left: "20px", zIndex: "2" }} onClick={onClick} />
    );
}  

export default function SimpleSlider() {
    const dispatch = useDispatch<any>()
    const carousel = useSelector((state: RootStates) => state.carousel.carousel)

    useEffect(() => {
        dispatch(fetchCarousel())
    }, [dispatch])

    console.log(carousel, "Carousel");
    
    var settings: {
        dots: boolean;
        infinite: boolean;
        speed: number;
        slidesToShow: number;
        slidesToScroll: number;
        nextArrow: JSX.Element;
        prevArrow: JSX.Element;
        dotsClass: string;
        autoplay: boolean,
        autoplaySpeed: number,
    } = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dotsClass: `slick-dots ${styles.dots_c}`,
        autoplay: true,
        autoplaySpeed: 3500,
    };    
  return (
    <div className={styles.carousel} >
        <Slider {...settings}>
            {carousel?.map((carousel: CarouselType, index: number) => (
                <div className={styles.carousel__item} key={index}>
                    <img src={carousel.images} className={styles.carousel__img} />
                    <div className={styles.text__carousel}>{carousel.description}</div>
                 </div>
            ))}
        </Slider>
    </div>
  );
}