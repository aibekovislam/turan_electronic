import { ProductsType } from "../utils/interfacesAndTypes";

export function extractPropertyArray<T>(items: T[] | undefined, propertyName: keyof T): any[] {
    const uniqueSet = new Set<string | string[]>();

    items?.forEach((item) => {
        if (propertyName !== "memory") {
            const propertyValue = String(item[propertyName]);
            uniqueSet.add(propertyValue);
        } else {
            const memoryValue = item[propertyName];
            if (Array.isArray(memoryValue)) {
                memoryValue.forEach((memoryItem) => {
                    uniqueSet.add(memoryItem);
                });
            } else {
                console.warn("Memory property is not an array");
            }
        }
    });

    return Array.from(uniqueSet);
}

export const filterMemory = (memory: any[]) => {
    const uniqueVolumes: any[] = [];
    const volumeSet = new Set();

    memory.forEach(item => {
        item.forEach((mem: any) => {
            if (!volumeSet.has(mem.volume)) {
                volumeSet.add(mem.volume);
                uniqueVolumes.push(mem);
            }
        })
    });

    return uniqueVolumes;
}


export const returnColorsForFilter = (products: any[]) => {
    const uniqueVolumes: any[] = [];
    const volumeSet = new Set();

    products.forEach(item => {
        item.forEach((color: any) => {
            if (!volumeSet.has(color.hash_code)) {
                volumeSet.add(color.hash_code);
                uniqueVolumes.push(color);
            }
        })
    });

    return uniqueVolumes;
}

export const extractBrandCategoryAndTitle = (products: ProductsType[] | undefined): { id: any, title: any }[] => {
    if (!products) {
        return [];
    }

    const uniqueBrandCategories = new Set();

    return products.reduce((acc, product) => {
        const brandCategory = product.brand_category;
        if (!uniqueBrandCategories.has(brandCategory)) {
            uniqueBrandCategories.add(brandCategory);

            acc.push({
                id: brandCategory,
                title: product.brand_category_title,
            });
        }

        return acc;
    }, [] as { id: any, title: any }[]);
};


export function getFilteredFirstImage(imgArray: any, selectedIndex: any) {
    if (!imgArray || !imgArray.length || selectedIndex < 0 || selectedIndex >= imgArray.length) {
      return '';
    }
  
    const filteredImages = imgArray.filter((_: any, index: any) => index === selectedIndex);
    return filteredImages.length ? filteredImages[0] : '';
}  


export const getHighestPrice = (products: any) => {
    if (!products || products.length === 0) {
        return 0;
    }

    const maxPrice = Math.max(...products.map((item: any) => item.price));
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxPrice)));

    return Math.floor(maxPrice / magnitude) * magnitude;
};

export const sortData = (data: any) => {
    return data.sort((a: any, b: any) => {
      if (a < b) return -1;
      if (a > b) return 1;
    
      if (!isNaN(a) && !isNaN(b)) {
        return Number(a) - Number(b);
      }
  
      if (!isNaN(a) && isNaN(b)) return 1;
      if (isNaN(a) && !isNaN(b)) return -1;
  
      return 0;
    });
};

export const compareByVolume = (a: any, b: any) => {
    return a.volume - b.volume;
};
  