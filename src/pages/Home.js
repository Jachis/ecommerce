import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Col, Row, InputGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, filterProductName, filterProductCategory } from '../store/slices/products.slice';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';

const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState('');
    const [productsCategories, setProductsCategories] = useState([]);


    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(getProducts());

        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/categories`)
            .then(res => setProductsCategories(res.data.data.categories));
    }, [dispatch]);

    const filterProducts = () => {
        dispatch(filterProductName(search))
    }

    const selectCategory = (id) => {
        dispatch(filterProductCategory(id))
    }

    return (
        <div>
            <h1>Home</h1>
            <Row className='g-4'>
                <Col lg={3} className='mb-4'>
                    <ListGroup>
                        {
                            productsCategories.map(category => (
                                <ListGroup.Item key={category.id} onClick={() => selectCategory(category.id)}>
                                    {category.name}
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>
                </Col>

                <Col>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Escribe un producto"
                            aria-label="Escribe un producto"
                            aria-describedby="basic-addon2"
                            onChange={e => setSearch(e.target.value)}
                            value={search}
                        />
                        <Button variant="primary" id="button-addon2" onClick={filterProducts}>
                            Buscar
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} className='g-4'>
                        {
                            products.map(product => (
                                <Col key={product.id}>
                                    <Card className='size-card' style={{ cursor: 'pointer' }} onClick={() => navigate(`/products/${product.id}`)}>
                                        <Card.Img variant='top' src={product.productImgs[0]} className='image-card px-5' />
                                        <Card.Body>
                                            <Card.Title>{product.title}</Card.Title>
                                            <h1>
                                                ${product.price}
                                            </h1>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </div>
    );
};
export default Home;