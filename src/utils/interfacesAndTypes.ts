export interface CategoryProps {
    type: string;
    img__url: string;
    brand: string;
}

export interface CardProps {
    type?: string
}

export interface BrandsProps {
    brandTitle: string,
    brandImg: string
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
    products: ProductsType[]
}

export type ProductsType = {
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