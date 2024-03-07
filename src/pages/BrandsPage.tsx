import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchOneBrand } from '../store/features/brands/oneBrandSlice';
import { RootStates } from '../store/store';
import BrandFilterNavbar from '../components/BrandFilterNavbar';
import { fetchProducts } from '../store/features/products/productSlice';

function BrandsPage() {
    const { brand } = useParams();
    const dispatch = useDispatch<any>();
    const oneBrand = useSelector((state: RootStates) => state.oneBrand.brand);
    const products = useSelector((state: RootStates) => state.products.products);

    useEffect(() => {
        if(brand != undefined) {
            dispatch(fetchOneBrand(+brand))
            dispatch(fetchProducts())
        }
    }, [dispatch, brand])

    if(oneBrand != undefined) {
        return (
            <>
                <BrandFilterNavbar brandImg={oneBrand?.logo_field} brandTitle={oneBrand?.title} />
                <div>
                    {  }
                </div>
            </>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default BrandsPage