import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { filterProductCategory } from '../store/slices/products.slice'
import { Row, Col, Card, Button, FormGroup } from 'react-bootstrap';
import { addToCart } from '../store/slices/cart.slice';


const ProductDetail = () => {

    const [product, setProduct] = useState({});

    const { id } = useParams();

    const Navigate = useNavigate();

    const products = useSelector(state => state.products);

    const dispatch = useDispatch();

    const [cartQuantity, setCartQuantity] = useState(1);

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
            .then(res => {
                const productSearched = res.data.data.products.find(productItem => productItem.id === Number(id));
                setProduct(productSearched);
                dispatch(filterProductCategory(productSearched.category.id))

            });
    }, [id, dispatch]);

    const addCart = () => {
        const cartProduct = {
            id,
            quantity: cartQuantity
        }
        dispatch(addToCart(cartProduct))
    }

    return (
        <div>
            <Row>
                <Col className='text-center'>
                    <h1>{product?.title}</h1>
                    <img src={product.productImgs?.[0]} alt="" className='img-fluid' />
                </Col>
                <Col lg={4} className='align-self-center'>
                    <p>{product.description}</p>
                    <h2>precio ${product.price}</h2>
                    <FormGroup className='row pt-5'>
                                <input
                                    className='col w-100 me-1'
                                    value={cartQuantity}
                                    placeholder='cantidad'
                                    onChange={e => setCartQuantity(e.target.value)}
                                />
                        <Button className='col' onClick={() => addCart()}>Agregar al carrito</Button>
                    </FormGroup>

                </Col>
            </Row>
            <Row className='d-flex'>
                {
                    products.map(product => (
                        <Col lg={3} xs={6} key={product.id} onClick={() => Navigate(`/Products/${product.id}`)} className='mt-5'>
                            <Card>
                                <Card.Img variant="top" src={product?.productImgs} className='image-card' />
                                <Card.Body className='text-center'>
                                    <Card.Title>{product?.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>

                    ))
                }
            </Row>
        </div>



    );
};

export default ProductDetail;