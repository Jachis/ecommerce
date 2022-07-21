import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
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
                    <Card className='my-5 d-flex justify-content-sm-between' key={purchases.createdAt}>
                        <Card.Header> {new Date(purchases.createdAt).toLocaleDateString('es-mx', options)}</Card.Header>
                        <Card.Body>
                            <Card.Title>
                                <table className="table mx-2">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                     {purchases.cart.products.map(prod => (
                                        <tr onClick={() => navigate(`/Products/${prod.productsInCart.id}`)} key={prod.id}>
                                            <th scope="row">{prod.title}</th>
                                            <td>{prod.productsInCart.quantity}</td>
                                            <td>${prod.price}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </Card.Title>
                        </Card.Body>
                    </Card>
                ))
            }
        </div>
    );
};

export default Purchases;