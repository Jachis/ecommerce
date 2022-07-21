import { useEffect } from 'react';
import { Badge, Button, ListGroup, Offcanvas } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartProducts, purchaseCart } from '../store/slices/cart.slice';
import { getPurchases } from '../store/slices/purchases.slice';

const Cart = ({ show, handleClose }) => {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectCartItem = (cartItem) =>{
        handleClose();
        navigate(`/Products/${cartItem.id}`);
    }

    useEffect(() => {
        dispatch(getCartProducts());
    }, [dispatch]);

    const buyCart = () =>{
        dispatch(purchaseCart())
        getPurchases()
        
    }

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><strong>Carrito</strong></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup as="ol" numbered>
                        {
                            cart.map(cartItem => (
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                    key={cartItem.id}
                                    onClick={() => selectCartItem(cartItem)}
                                >
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold">{cartItem.title}</div>
                                        ${cartItem.price}
                                    </div>
                                    <Badge bg="primary" pill>
                                        {cartItem.productsInCart.quantity}
                                    </Badge>
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Offcanvas.Body>
                <Button onClick={() => buyCart()} className='m-4'>Comprar</Button>
            </Offcanvas>
        </div>
    );
};

export default Cart;