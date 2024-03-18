
function Test() {
const rangeInput: NodeList = document.querySelectorAll(".range-input input");
const priceInput: NodeList = document.querySelectorAll(".price-input input");
const range: HTMLElement | null = document.querySelector(".slider .progress");

let priceGap: number = 1000;

priceInput.forEach((input) => {
  input.addEventListener("input", (e: Event) => {
    let target = e.target as HTMLInputElement;
    let minPrice: number = parseInt((priceInput[0] as HTMLInputElement).value, 10),
        maxPrice: number = parseInt((priceInput[1] as HTMLInputElement).value, 10);

    if (maxPrice - minPrice >= priceGap && maxPrice <= parseInt((rangeInput[1] as HTMLInputElement).max, 10)) {
      if (target.className === "input-min") {
        (rangeInput[0] as HTMLInputElement).value = minPrice.toString();
        range!.style.left = `${(minPrice / parseInt((rangeInput[0] as HTMLInputElement).max, 10)) * 100}%`;
      } else {
        (rangeInput[1] as HTMLInputElement).value = maxPrice.toString();
        range!.style.right = `${100 - (maxPrice / parseInt((rangeInput[1] as HTMLInputElement).max, 10)) * 100}%`;
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e: Event) => {
    let target = e.target as HTMLInputElement;
    let minVal: number = parseInt((rangeInput[0] as HTMLInputElement).value, 10),
        maxVal: number = parseInt((rangeInput[1] as HTMLInputElement).value, 10);

    if (maxVal - minVal < priceGap) {
      if (target.className === "range-min") {
        (rangeInput[0] as HTMLInputElement).value = (maxVal - priceGap).toString();
      } else {
        (rangeInput[1] as HTMLInputElement).value = (minVal + priceGap).toString();
      }
    } else {
      (priceInput[0] as HTMLInputElement).value = minVal.toString();
      (priceInput[1] as HTMLInputElement).value = maxVal.toString();
      range!.style.left = `${(minVal / parseInt((rangeInput[0] as HTMLInputElement).max, 10)) * 100}%`;
      range!.style.right = `${100 - (maxVal / parseInt((rangeInput[1] as HTMLInputElement).max, 10)) * 100}%`;
    }
  });
});


  return (
  <div className="wrapper">
    <header>
      <h2>Price Range</h2>
    </header>
    <div className="price-input">
      <div className="field">
        <span>Min</span>
        <input type="number" className="input-min" value="2500" />
      </div>
      <div className="seperator">-</div>
      <div className="field">
        <span>Max</span>
        <input type="number" className="input-max" value="7500" />
      </div>
    </div>
    <div className="slider">
      <div className="progress"></div>
    </div>
    <div className="range-input">
      <input type="range" className="range-min" min="0" max="10000" value="2500" step="100"/>
      <input type="range" className="range-max" min="0" max="10000" value="7500" step="100"/>
  </div>
  </div>
  )
}

export default Test