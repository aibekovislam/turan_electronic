import Slider from "react-slick";
import prevArrowSVG from "../assets/svgs/Vector (5).svg";
import nextArrowSVG from "../assets/svgs/Vector (6).svg";
import styles from "../styles/slider.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootStates } from "../store/store";
import { useEffect, useState } from "react";
import { fetchCarousel, fetchCarouselMobile } from "../store/features/carousel/carouselSlice";
import {  CarouselType } from "../utils/interfacesAndTypes";
import 'ldrs/ring';
import { ping } from 'ldrs'
import { API_URL } from "../utils/consts";

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
    const carousel = useSelector((state: RootStates) => state.carousel.carousel);
    const carouselMobile = useSelector((state: RootStates) => state.carousel.carouselMobile);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 520);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 520);
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        dispatch(fetchCarousel());
        dispatch(fetchCarouselMobile());
    }, [dispatch])

    ping.register();
    
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

    console.log(carouselMobile)
    
  return (
    <div className={styles.carousel} >
        { isMobile ? (
            carouselMobile?.length !== 0 ? (
                <Slider {...settings}>
                    {carouselMobile?.map((carousel: CarouselType, index: number) => (
                        <div className={styles.carousel__item} key={index}>
                            <img src={`${API_URL}/${carousel.images.slice(16)}`} className={styles.carousel__img} />
                            <div className={styles.text__carousel}>{carousel.description}</div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className={styles.loading}>
                    <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                    <div>Загрузка...</div>
                </div>
            )
        ) : (
            carousel?.length !== 0 ? (
                <Slider {...settings}>
                    {carousel?.map((carousel: CarouselType, index: number) => (
                        <div className={styles.carousel__item} key={index}>
                            <img src={`${API_URL}/${carousel.images.slice(16)}`} className={styles.carousel__img} />
                            <div className={styles.text__carousel}>{carousel.description}</div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div className={styles.loading}>
                    <l-ping size="45" speed="2" color="rgba(255, 115, 0, 0.847)"></l-ping>
                    <div>Загрузка...</div>
                </div>
            )
        ) }
    </div>
  );
}