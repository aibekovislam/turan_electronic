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
    brand: BrandsType,
    products?: ProductsType[] | undefined,
    colors?: string[] | undefined,
}

export interface ArrowProps {
    isUp: boolean
}

export interface AuthAndRegProps {
    registered?: boolean,
    handleRegisterOrAuth: (e: boolean, data?: any) => void
}

export interface AuthState {
    isAuthenticated: boolean,
    userActive: {
        uid: string,
        token: string
    },
    user: null | UserT
}

export interface ReviewI {
    reviews: any[]
}

export interface ProductsI {
    products: ProductsType[],
    colors?: string[],
    filteredProducts?: ProductsType[]
}

export interface ActiveUserI {
    user: UserType,
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

export const default_filters = {
    limit: 10,
    offset: 0,
    min_price: undefined,
    max_price: undefined,
    brand: [],
    product_color: [],
    memory: [],
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
    color: string[];
    memory: string[] | undefined;
    product_images: {
        [key: string]: string[];
    };
    brand_title: string,
    brand_category_title: string
}

export type UserT = {
    email: string;
    password: string;
}

export type UserType = {
    uid: string | null;
    token: string | null;
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