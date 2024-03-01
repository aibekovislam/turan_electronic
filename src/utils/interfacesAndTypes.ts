import React from "react";

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