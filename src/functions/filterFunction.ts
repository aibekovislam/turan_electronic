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
        if (!volumeSet.has(item.volume)) {
            uniqueVolumes.push(item);
            volumeSet.add(item.volume);
        }
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
    let acc = 0;
    products.map((item: any) => acc += item.price);
    return acc;
}