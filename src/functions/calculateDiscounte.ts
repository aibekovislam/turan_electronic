export function calculateDiscountedPrice(originalPrice: number | undefined, discountPercentage: number | undefined): number | undefined {
    if(originalPrice != undefined && discountPercentage != undefined) {
      if (originalPrice >= 0 && discountPercentage >= 0 && discountPercentage <= 100) {
        const discountAmount = (originalPrice * discountPercentage) / 100;
        const discountedPrice = originalPrice - discountAmount;
        return discountedPrice;
      } else {
        console.error("Invalid input. Please provide valid values for originalPrice and discountPercentage.");
        return 0;
      }
    }
}