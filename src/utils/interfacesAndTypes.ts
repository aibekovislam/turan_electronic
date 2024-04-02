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
    dataForDropDown: any,
    productsByBrandCategory?: any
}

export interface ArrowProps {
    isUp: boolean,
    style?: any
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

export interface FavoriteState {
    favorites: favoriteType[]
}

export interface CartState {
    carts: CartType[]
}

export interface ReviewI {
    reviews: any[]
}

export interface ProductsI {
    products?: ProductsType[],
    colors?: string[],
    filteredProducts?: ProductsType[],
    filterByBrand?: ProductsType[],
    filterByBrandCategory?: []
}

export interface ActiveUserI {
    user: UserType,
}

export interface ProductI {
    product?: null | ProductsType,
    pickedColor?: null | string
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

export interface FooterI {
    footers: FootersType | null
}

export interface NewsI {
    news?: null | NewsType[]
}

export interface CarouselI {
    carousel: CarouselType[]
}

export interface OrderI {
    regions: RegionType[],
    cities: CityType[],
    order: OrderType[]
}

export const default_filters = {
    limit: 100,
    offset: 0,
    min_price: undefined,
    max_price: undefined,
    brand: [],
    product_color: [],
    memory: [],
}

export type favoriteType = {
    id?: number,
    created_at: string,
    user: number,
    product: ProductsType[]
}

export type RenderDropdownTypes = {
    index: number, 
    pickedColor: any, 
    setPickedColor: any, 
    brand: any, 
    fetchProductsAndLog: any, 
    filters: any, 
    dataForDropdown: ProductsType[] | undefined, 
    fetchFilterDropdown: any, 
    productsByBrandCategory: ProductsType[]
}

export type RenderSidebarTypes = {
    index: number, products: ProductsType[] | undefined, pickedColor: any, setPickedColor: any, brand: any, fetchProductsAndLog: any, filters: any, showAllColors: any, setShowAllColors: any
}

export type CartType = {
    price(price: any, discount: any): unknown;
    discount(price: any, discount: any): unknown;
    id?: any,
    user: number,
    product: any,
    created_at: string,
    color?: any,
    memory_name: any, 
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
    created_at: any,
    characteristics: {
        [key: string]: any
    };
    category: number;
    brand: number;
    brand_category: number;
    memory: [
        {
            id: any,
            volume: any
        }
    ];
    product_images: {
        [key: string]: string[];
    };
    brand_title: string,
    brand_category_title: string;
    color: any,
    memory_price: {
        [key: string]: string
    }
}

export type CityType = {
    id: number,
    name: string,
    region: number
}

export type RegionType = {
    id: number,
    name: string
}

export type OrderType = {
    name: string,
    email: string,
    phone: string,
    region: number,
    city: number,
    street: string,
    house: string,
    items: any[]
}

export type UserT = {
    email: string;
    password?: string;
    name?: string
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

export type FootersType = {
    location? : string;
    schedule: string;
    phone: string;
    email: string;
}

export type NewsType = {
    id? : any;
    title: string;
    text: string;
    image: string;
}

export type CarouselType = {
    id? : number;
    images: string;
    description: string
}

export type Range = {
    min: number;
    max: number;
};
  
export type Props = {
    style?: any,
    fetchProductsAndLog: (params: { min_price: number; max_price: number; brand: string }) => void;
    brand?: { id: string };
    products: any
};