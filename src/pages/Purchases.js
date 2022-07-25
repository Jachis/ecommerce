import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    
    useEffect(() => {
        dispatch(getPurchases());
    }, [dispatch]);

    return (
        <div>
            <h1>Compras</h1>
            {
                purchases.map(purchases => (
                    <div className='my-5 border rounded' key={purchases.createdAt}>
                        <div className='fw-bold p-4 border-bottom'>
                            {new Date(purchases.createdAt).toLocaleDateString('es-mx', options)}{/*purchases.map(prod =>Number([prod.cart.products.price])).reduce((a, b) => a + b,0)*/}
                        </div>
                        <div className='text-end'>
                                <table className="table table-borderless mx-2 p-3">
                                    <thead>
                                        <tr className='row p-3'>
                                            <th className='col text-start py-3'>Producto</th>
                                            <th className='col py-3'>Cantidad</th>
                                            <th className='col pe-5'> Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                     {purchases.cart.products.map(prod => (
                                        <tr className='row p-3' onClick={() => navigate(`/Products/${prod.productsInCart.id}`)} key={prod.id}>
                                            <th className='col text-start py-3'>{prod.title}</th>
                                            <td className='col py-3'>{prod.productsInCart.quantity}</td>
                                            <td className='col pe-5'>${prod.price}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Purchases;