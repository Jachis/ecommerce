import axios from 'axios';
import {Button, Form, Card } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const defaultValues = { email: "", password: "" }
    const submit = data => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
             .then(res =>{
                localStorage.setItem('token', res.data.data.token)
                navigate('/')
             })
             .catch(error => {
                console.log(error.response)
                if(error.response.status === 404){
                    alert('Credenciales invalidas')
                }
            })
        reset(defaultValues)
    }

    return (
        <div className='fs-6 w-50 mx-auto'>
            <Card className='mt-5 p-5'>
                <h1>Login</h1>
                <Form onSubmit={handleSubmit(submit)} className='mt-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Direccion de email</Form.Label>
                        <Form.Control {...register('email')} type="email" placeholder="Escribe tu email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control {...register('password')} type="password" placeholder="Escribe tu Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card >
        </div>

    );
}

export default Login;