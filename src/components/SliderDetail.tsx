
import { useState } from 'react';
import styles from "../styles/slider.module.scss"
import ArrowLeft from "../assets/svgs/detail/leftArrow.svg"
import ArrowRight from "../assets/svgs/detail/rightArrow.svg"
import example from '../assets/sliderDetail/img01.png'
import { SliderDetailProps } from '../utils/interfacesAndTypes';

function SliderDetail({ img_array, default_image }: SliderDetailProps) {
  console.log(img_array, default_image)
  const imgs: any =[
    {id:0,value:{example}},
    {id:1,value:{example}},
    {id:2,value:{example}},
    {id:3,value:{example}},
  ]
  const [wordData,setWordData]=useState(imgs[0])
  const [val,setVal] = useState(0)
  const handleClick=(index : any)=>{
    console.log(index)
    setVal(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }
  const handleNext = ()=>{
    let index = val < imgs.length -1 ? val +1 : val;
    setVal(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }
  const handlePrevious = ()=>{
    let index = val <= imgs.length -1 && val > 0? val - 1 : val;
    setVal(index)
    const wordSlider=imgs[index];
    setWordData(wordSlider)
  }
  
  return (
    <div className={styles.main}>
      <div className={styles.carousel_detail}>
        <img src={ArrowLeft} className={styles.arrow_detail} onClick={handlePrevious}/>
        <img src={wordData.value.example}  className={styles.detail_img} /> 
        <img src={ArrowRight} className={styles.arrow_detail} onClick={handleNext}/>
      </div>
      <div className={styles.flex_row}>
        {imgs.map((data: any,i: number)=>
          <div className={styles.thumbnail} key={i} >
            <img className={wordData.id == i ? styles.clicked : styles.detail_img__item } src={data.value.example} onClick={()=>handleClick(i)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default SliderDetail;