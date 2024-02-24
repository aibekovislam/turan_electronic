import Slider from "react-slick";
import prevArrowSVG from "../assets/svgs/Vector (5).svg";
import nextArrowSVG from "../assets/svgs/Vector (6).svg";
import styles from "../styles/slider.module.scss";
import React from "react";

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
    var settings: {
        dots: boolean;
        infinite: boolean;
        speed: number;
        slidesToShow: number;
        slidesToScroll: number;
        nextArrow: JSX.Element;
        prevArrow: JSX.Element;
        appendDots: (dots: JSX.Element) => JSX.Element;
        customPaging: (i: number) => JSX.Element;
    } = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        appendDots: dots => (
            <div style={{ position: "absolute", bottom: "10px" }} >
                <ul style={{ margin: "0px" }}> {dots} </ul>
            </div>
        ),             
        customPaging: () => (
            <div
                style={{
                    "width": "8px", 
                    "height": "8px", 
                    "borderRadius": "50%",
                    "backgroundColor": "#D9D9D9" 
                }}>
            </div>
        )
    };    
  return (
    <div className={styles.carousel} >
        <Slider {...settings}>
            <div>
                <img src="https://s3-alpha-sig.figma.com/img/a168/6110/47f9cdb61d3cfea251c8edf680705f72?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PFwuEdogxXr9Hk7BjKvnomoPFEYjfR0tjfKPTSVanFibJo9VADi8kgv4GP6Wogab4fU~5cUF35Xy0D1i1E3gSclqawtkLLmJOlLve33uzK1BDDfD3n-~bTRkGSe67P4~ER845g92dnwAGq-4RUYoee1gH23ifMpDcJCGsoETG0M2gm6LADQZF9~39Hu6XsXKxykCf68LHAW3xhMAtwRzNjMJ6qph4Y~q9CiGMLvn~mcGNWsiz7sq4AgoZO24nF~LnaSQ3Gqq9xqG7rlSM9OIIWniAlxn4XeYHfMk8Hgv7xT5uYznwF8wD1hi5SwxJEiXZh8EcrH522DY6LBdeD15OA__" className={styles.carousel__img} />
            </div>
            <div>
                <img src="https://s3-alpha-sig.figma.com/img/a168/6110/47f9cdb61d3cfea251c8edf680705f72?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PFwuEdogxXr9Hk7BjKvnomoPFEYjfR0tjfKPTSVanFibJo9VADi8kgv4GP6Wogab4fU~5cUF35Xy0D1i1E3gSclqawtkLLmJOlLve33uzK1BDDfD3n-~bTRkGSe67P4~ER845g92dnwAGq-4RUYoee1gH23ifMpDcJCGsoETG0M2gm6LADQZF9~39Hu6XsXKxykCf68LHAW3xhMAtwRzNjMJ6qph4Y~q9CiGMLvn~mcGNWsiz7sq4AgoZO24nF~LnaSQ3Gqq9xqG7rlSM9OIIWniAlxn4XeYHfMk8Hgv7xT5uYznwF8wD1hi5SwxJEiXZh8EcrH522DY6LBdeD15OA__" className={styles.carousel__img} />
            </div>
            <div>
                <img src="https://s3-alpha-sig.figma.com/img/a168/6110/47f9cdb61d3cfea251c8edf680705f72?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PFwuEdogxXr9Hk7BjKvnomoPFEYjfR0tjfKPTSVanFibJo9VADi8kgv4GP6Wogab4fU~5cUF35Xy0D1i1E3gSclqawtkLLmJOlLve33uzK1BDDfD3n-~bTRkGSe67P4~ER845g92dnwAGq-4RUYoee1gH23ifMpDcJCGsoETG0M2gm6LADQZF9~39Hu6XsXKxykCf68LHAW3xhMAtwRzNjMJ6qph4Y~q9CiGMLvn~mcGNWsiz7sq4AgoZO24nF~LnaSQ3Gqq9xqG7rlSM9OIIWniAlxn4XeYHfMk8Hgv7xT5uYznwF8wD1hi5SwxJEiXZh8EcrH522DY6LBdeD15OA__" className={styles.carousel__img} />
            </div>
            <div>
                <img src="https://s3-alpha-sig.figma.com/img/a168/6110/47f9cdb61d3cfea251c8edf680705f72?Expires=1709510400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PFwuEdogxXr9Hk7BjKvnomoPFEYjfR0tjfKPTSVanFibJo9VADi8kgv4GP6Wogab4fU~5cUF35Xy0D1i1E3gSclqawtkLLmJOlLve33uzK1BDDfD3n-~bTRkGSe67P4~ER845g92dnwAGq-4RUYoee1gH23ifMpDcJCGsoETG0M2gm6LADQZF9~39Hu6XsXKxykCf68LHAW3xhMAtwRzNjMJ6qph4Y~q9CiGMLvn~mcGNWsiz7sq4AgoZO24nF~LnaSQ3Gqq9xqG7rlSM9OIIWniAlxn4XeYHfMk8Hgv7xT5uYznwF8wD1hi5SwxJEiXZh8EcrH522DY6LBdeD15OA__" className={styles.carousel__img} />     
            </div>
        </Slider>
    </div>
  );
}