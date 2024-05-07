import { useEffect, useState } from 'react';
import styles from "../styles/slider.module.scss"
import ArrowLeft from "../assets/svgs/detail/leftArrow.svg"
import ArrowRight from "../assets/svgs/detail/rightArrow.svg"
import { SliderDetailProps } from '../utils/interfacesAndTypes';
import { API_URL } from '../utils/consts';
import { getFilteredFirstImage } from '../functions/filterFunction';
import 'ldrs/ring';
import { ping } from 'ldrs';


function SliderDetail({ img_array, default_image, selectedColor }: SliderDetailProps) {
  const [wordData, setWordData] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const [touchStartX, setTouchStartX] = useState(0);
  const [actionTaken, setActionTaken] = useState(false);

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (!actionTaken) {
      const touchMoveX = e.touches[0].clientX;
      const diff = touchMoveX - touchStartX;
      const threshold = 40;

      if (diff > threshold) {
        // Свайп вправо
        handlePrevious();
        setActionTaken(true);
      } else if (diff < -threshold) {
        // Свайп влево
        handleNext();
        setActionTaken(true);
      }
    }
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    setTouchStartX(0);
    setActionTaken(false);
  };

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  ping.register();

  useEffect(() => {
    if (img_array && img_array[selectedColor]) {
      setLoading(true);
      setWordData(img_array[selectedColor]);
    } else {
      setWordData([default_image])
    }
  }, [selectedColor, img_array]);

  useEffect(() => {
    setLoading(false);
  }, [wordData]);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    const wordSlider = img_array[selectedColor]?.[index];
    setWordData(wordSlider !== undefined ? wordSlider : default_image);
  };

  const handleChange = (index: number) => {
    setSelectedIndex(index);
    const wordSlider = img_array[selectedColor]?.[index];
    setWordData(wordSlider !== undefined ? wordSlider : default_image);
  };

  const handleNext = () => {
    const index = selectedIndex < (img_array[selectedColor]?.length || 0) - 1 ? selectedIndex + 1 : 0;
    handleChange(index);
  };

  const handlePrevious = () => {
    const index = selectedIndex > 0 ? selectedIndex - 1 : (img_array[selectedColor]?.length || 0) - 1;
    handleChange(index);
  };

  if (!wordData) {
    return <l-ping
              size="45"
              speed="2" 
              color="black" 
          ></l-ping>;
  }  

  const filteredFirstImage = getFilteredFirstImage(img_array[selectedColor], selectedIndex);

  return (
    <div className={styles.main}>
      <div className={styles.carousel_detail} onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        { filteredFirstImage ? (
          <img src={ArrowLeft} className={styles.arrow_detail} onClick={handlePrevious} />
        ) : (null) }
        {loading ? (
            <l-ping
              size="45"
              speed="2" 
              color="black" 
            ></l-ping>
        ) : (
          <img 
              src={wordData.length !== 0 && filteredFirstImage ? `${API_URL}${filteredFirstImage}` : `${default_image}`} 
              className={styles.detail_img} 
          />
        )}
        { filteredFirstImage ? (
          <img src={ArrowRight} className={styles.arrow_detail} onClick={handleNext} />
        ) : (null) }
      </div>
      <div className={styles.flex_row}>
        {img_array[selectedColor]?.map((image: string, i: number) => (
          <div className={styles.thumbnail} key={i}>
            {image ? (
              <img
                className={selectedIndex === i ? styles.clicked : styles.detail_img__item}
                src={`${API_URL}${image}`}
                onClick={() => {
                  handleClick(i);
                }}
              />
            ) : (
              <l-ping
                  size="45"
                  speed="2" 
                  color="black" 
              ></l-ping>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderDetail;