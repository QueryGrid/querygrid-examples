import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Card, Container, Form, FormGroup, Input, Label} from "reactstrap";
import request from "../services/request";

const form = [
    {
        type: 'file',
        name: 'file',
    },
]

const Upload = () => {
    const [file, setFile] = useState()

    const changeHandler = (event) => {
        const {files} = event.target;
        setFile(files[0])
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const response = await request.storage.uploadImage(file);
        console.log("RESPONSE", response);
        if (response.statusCode === 200) {
            // setValues(defaultValue);
            // navigate('/')
        }
    }

    return (
        <Container style={{ maxWidth: '400px' }}>
            <Card style={{ padding: '20px', marginTop: '30px' }}>
                <Form onSubmit={submitHandler}>
                    {form.map((input) => (
                        <FormGroup key={input.name}>
                            <Label for={input.name}>
                                Upload File
                            </Label>
                            <Input
                                id={input.name}
                                name={input.name}
                                placeholder={input.placeholder}
                                type={input.type}
                                onChange={changeHandler}
                            />
                        </FormGroup>
                    ))}
                    <Button color={"info"} style={{color: '#fff'}}>Upload</Button>
                </Form>
            </Card>
        </Container>
    );
}

export default Upload;