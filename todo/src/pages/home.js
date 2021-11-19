import {useState} from "react";
import {Button, Card, Container, FormGroup, Input} from "reactstrap";
import request from "../services/request";
import FormModal from "../components/modal/modal";
import Todo from "../components/todo/todo";

const defaultValues = {
    title: '',
    completed: 'false'
}

const data = [
    {
        id: '1',
        title: 'watch seven deadly sins',
        completed: 'true'
    },
    {
        id: '2',
        title: 'watch one punch man',
        completed: 'false'
    },
    {
        id: '3',
        title: 'watch javascript course',
        completed: 'false'
    }
]

const Home = () => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState(defaultValues);

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const createTodo = async (event) => {
        event.preventDefault();
        const todo = await request.service.create('fiona', [
            {
                name: 'name',
                type: 'string',
                value: 'fiona'
            },
            {
                name: 'gender',
                type: 'string',
                value: 'strict female'
            }
        ])

        console.log("CREATED TODO", todo)
    }

    const selectTodo = async (event) => {
        event.preventDefault();
        const todo = await request.select('todos', {
            where: {
                completed: 'false'
            },
            select: ['completed']
        })

        console.log("CREATED TODO", todo)
    }

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

    const openModal = (values) => {
        setFormValues(values)
        setOpen(true)
    }

    const closeModal = () => {
        setOpen(false)
    }

    const deleteHandler = (values) => {
        console.log("DELETE", values)
    }

    return (
        <>
            <FormModal open={open} toggleModal={closeModal} changeHandler={changeHandler} formValues={formValues} />
            <Container style={{maxWidth: '900px', marginTop: '30px', textAlign: 'right'}}>
                <Button style={{color: '#fff', marginBottom: '20px'}} onClick={() => openModal(defaultValues)}>
                    Create Todo
                </Button>
                {data.map((todo) => (
                    <Todo key={todo.id} data={todo} openModal={openModal} deleteHandler={deleteHandler} />
                ))}
            </Container>
        </>
    )
}

export default Home