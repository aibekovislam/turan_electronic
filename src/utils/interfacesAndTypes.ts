export interface CategoryProps {
    type: string;
    brand: BrandsType;
}

export interface SliderDetailProps {
    img_array?: any;
    default_image?: any;
    selectedColor: any;
}  

export interface CardProps {
    type?: string,
    product: ProductsType,
    onClick: (id: number) => void
}

export interface BrandsProps {
    brandTitle: string,
    brandImg: string,
    products?: ProductsType[] | undefined,
    colors?: string[] | undefined
}

export interface ArrowProps {
    isUp: boolean
}

export interface AuthAndRegProps {
    registered?: boolean,
    handleRegisterOrAuth: (e: boolean, data?: any) => void
}

export interface AuthState {
    isAuthenticated: boolean
}

export interface ProductsI {
    products: ProductsType[],
    colors?: string[]
}

export interface ProductI {
    product?: null | ProductsType
}

export interface BrandI {
    brand?: null | BrandsType
}

export interface AccessoriesI {
    accessories: AccessoriesType[]
}

export interface RecProductsI {
    rec_products: ProductsType[]
}

export interface BrandsI {
    brands: BrandsType[]
}

export interface CarouselI {
    carousel: CarouselType[]
}

export type ProductsType = {
    id: number;
    name: string;
    description: string;
    price: number;
    default_image?: string;
    is_arrived?: boolean;
    rating: number;
    in_stock?: boolean;
    discount: number;
    characteristics: {
        [key: string]: string
    };
    category: number;
    brand: number;
    brand_category: number;
    color: number[];
    memory: string[];
    product_images: {
        [key: string]: string[];
    };
    brand_title: string,
    brand_category_title: string
}

export type AccessoriesType = {
    id?: number;
    name: string;
    description: string;
    price: number;
    default_image?: string;
    is_arrived?: boolean;
    rating: number;
    in_stock?: boolean;
    discount: number;
    characteristics: {
        [key: string]: string
    };
    category: number;
    brand: number;
    brand_category: number;
    color: number[];
}

export type BrandsType = {
    id? : number;
    title: string;
    logo_field: string;
    image: string;
}

export type CarouselType = {
    id? : number;
    images: string;
    description: string
}