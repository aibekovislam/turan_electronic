import Slider from "react-slick";
import img1 from "../assets/sliderDetail/img01.png";
import img2 from "../assets/sliderDetail/img02.png";
import img3 from "../assets/sliderDetail/img03.png";
import img4 from "../assets/sliderDetail/img04.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function SliderDetail() {
    const images = [img1, img2, img3, img4];   
  const settings = {
    customPaging: function(i: any) {
      return (
        <a>
          <img src={images[i]} alt={`thumbnail-${i}`} style={{ width: 50 }} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`slide-${index}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderDetail;