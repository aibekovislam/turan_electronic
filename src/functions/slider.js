const rangeInput = document.querySelectorAll(".range-input input")
const priceInput = document.querySelectorAll(".price-input input"),
progress = document.querySelector(".slider .progress")

let priceGap = 1000;

priceInput.forEach(input => {
    input.addEventListener("input", () => {
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if ((maxVal - minVal >= priceGap) && maxVal <= 10000) {
            if(e.target.className === "input-min"){
                rangeInput[0].value = minVal;
                progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            }else{
                rangeInput[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
            }
        }
    });
});

rangeInput.forEach(input => {
    input.addEventListener("input", () => {
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

        if (maxVal - minVal < priceGap) {
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap;
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        } else {
            priceInput[0].value = minVal
            priceInput[1].value = maxVal
            progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        } 
    });
});

// const rangeInput = document.querySelectorAll(".range-input input") as NodeListOf<HTMLInputElement>;
//         const priceInput = document.querySelectorAll(".price-input input") as NodeListOf<HTMLInputElement>;
//         const progress = document.querySelector(".slider .progress") as HTMLDivElement;

//         let priceGap: number = 1000;

//         priceInput.forEach(input => {
//             input.addEventListener("input", (e: Event) => {
//                 let minVal: number = parseInt(rangeInput[0].value),
//                 maxVal: number = parseInt(rangeInput[1].value);

//                 let target = e.target as HTMLInputElement;

//                 if ((maxVal - minVal >= priceGap) && maxVal <= 10000) {
//                     if(target.className === "input-min"){
//                         rangeInput[0].value = minVal.toString();
//                         progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
//                     } else {
//                         rangeInput[1].value = maxVal.toString();
//                         progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
//                     }
//                 }
//             });
//         });

//         rangeInput.forEach(input => {
//             input.addEventListener("input", (e: Event) => {
//                 let minVal: number = parseInt(rangeInput[0].value),
//                 maxVal: number = parseInt(rangeInput[1].value);

//                 let target = e.target as HTMLInputElement;

//                 if (maxVal - minVal < priceGap) {
//                     if(target.className === "range-min"){
//                         rangeInput[0].value = (maxVal - priceGap).toString();
//                     } else {
//                         rangeInput[1].value = (minVal + priceGap).toString();
//                     }
//                 } else {
//                     priceInput[0].value = minVal.toString();
//                     priceInput[1].value = maxVal.toString();
//                     progress.style.left = (minVal / rangeInput[0].max) * 100 + "%";
//                     progress.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
//                 } 
//             });
//         });