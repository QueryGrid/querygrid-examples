import {useEffect, useState} from "react";
import {Button, Card, Container, FormGroup, Input} from "reactstrap";
import request from "../services/request";
import FormModal from "../components/modal/modal";
import Todo from "../components/todo/todo";

const defaultValues = {
    title: '',
    completed: 'false'
}

const Home = () => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState(defaultValues);
    const [todos, setTodos] = useState([]);
    const [modalType, setModalType] = useState('new');

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const createTodo = async () => {
        const todo = await request.service.create('todos', [
            {
                name: 'title',
                value: formValues.title
            },
            {
                name: 'completed',
                value: formValues.completed
            }
        ]);

        if (todo.statusCode === 201) {
            setTodos([...todos, todo.data]);
            setOpen(false)
        }

        console.log("CREATED TODO", todo)
    }

    useEffect(() => {
        request.service.select('todos', {
            select: ['id', 'title', 'completed'],
        }).then((response) => {
            if (response.statusCode === 200) {
                setTodos(response.data)
            }

            console.log(response)
        })
    }, [])


    const updateTodo = async (event) => {
        event.preventDefault();
        const todo = await request.service.update('fiona', {
            where: {
                id: 'quPJswzP0omLRB'
            },
            columns: [
                {
                    name: 'state',
                    value: 'anambra'
                }
            ]
        })

        console.log("UPDATED TODO", todo)
    }

    const openModal = (values, type) => {
        setFormValues(values)
        setOpen(true)
        setModalType(type)
    }

    const saveHandler = (event) => {
        event.preventDefault()

        if (modalType === 'new') {
            createTodo()
        }
    }

    const closeModal = () => {
        setOpen(false)
    }

    const deleteHandler = (values) => {
        console.log("DELETE", values)
    }

    return (
        <>
            <FormModal open={open} toggleModal={closeModal} changeHandler={changeHandler} saveHandler={saveHandler} formValues={formValues} />
            <Container style={{maxWidth: '900px', marginTop: '30px', textAlign: 'right'}}>
                <Button style={{color: '#fff', marginBottom: '20px'}} onClick={() => openModal(defaultValues, 'new')}>
                    Create Todo
                </Button>
                {todos.length < 1 && <p style={{ textAlign: 'center' }}>No Todo</p>}
                {todos.map((todo) => (
                    <Todo key={todo.id} data={todo} openModal={openModal} deleteHandler={deleteHandler} />
                ))}
            </Container>
        </>
    )
}

export default Home