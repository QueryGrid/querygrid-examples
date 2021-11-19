import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, Container, Form, FormGroup, Input, Label} from "reactstrap";
import request from "../services/request";

const defaultValue = {
    email: '',
    password: ''
}

const form = [
    {
        type: 'email',
        name: 'email',
        placeholder: 'email',
    },
    {
        type: 'password',
        name: 'password',
        placeholder: 'password',
    }
]

const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState(defaultValue)

    const changeHandler = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]: value})
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const response = await request.auth.signInWithEmailAndPassword(values.email, values.password);
        console.log("RESPONSE", response);
        if (response.statusCode === 200) {
            setValues(defaultValue);
            navigate('/')
        }
    }

    return (
        <Container style={{ maxWidth: '400px' }}>
            <Card style={{ padding: '20px', marginTop: '30px' }}>
                <Form onSubmit={submitHandler}>
                    {form.map((input) => (
                        <FormGroup key={input.name}>
                            <Label for={input.name}>
                                Email
                            </Label>
                            <Input
                                id={input.name}
                                name={input.name}
                                placeholder={input.placeholder}
                                type={input.type}
                                value={values[input.name]}
                                onChange={changeHandler}
                            />
                        </FormGroup>
                    ))}
                    <Button color={"info"} style={{color: '#fff'}}>Sign In</Button>
                </Form>
            </Card>
        </Container>
    );
}

export default Login;