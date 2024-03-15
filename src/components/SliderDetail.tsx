import { useEffect, useState } from 'react';
import styles from "../styles/slider.module.scss"
import ArrowLeft from "../assets/svgs/detail/leftArrow.svg"
import ArrowRight from "../assets/svgs/detail/rightArrow.svg"
import { SliderDetailProps } from '../utils/interfacesAndTypes';
import { API_URL } from '../utils/consts';

function SliderDetail({ img_array, default_image, selectedColor }: SliderDetailProps) {
  const [wordData, setWordData] = useState<string | undefined>(img_array[selectedColor]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setWordData(img_array[selectedColor]);
  }, [selectedColor]);

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

  if (!selectedColor || img_array[selectedColor] === undefined) {
    return <div>Loading...</div>;
  }  

  console.log(wordData)

  return (
    <div className={styles.main}>
      <div className={styles.carousel_detail}>
        <img src={ArrowLeft} className={styles.arrow_detail} onClick={handlePrevious} />
        <img src={wordData?.length !== 0 ? `${API_URL}${wordData}` : default_image} className={styles.detail_img} />
        <img src={ArrowRight} className={styles.arrow_detail} onClick={handleNext} />
      </div>
      <div className={styles.flex_row}>
        {img_array[selectedColor]?.map((image: string, i: number) => (
          <div className={styles.thumbnail} key={i}>
            {image && (
              <img
                className={selectedIndex === i ? styles.clicked : styles.detail_img__item}
                src={`${API_URL}${image}`}
                onClick={() => {
                  handleClick(i);
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SliderDetail;