import {useEffect, useState} from "react";
import {Button, Card, Container, FormGroup, Input} from "reactstrap";
import request from "../services/request";
import FormModal from "../components/modal/modal";
import Todo from "../components/todo/todo";

const defaultValues = {
    title: '',
    completed: 'false'
}

const Realtime = () => {
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState(defaultValues);
    const [todos, setTodos] = useState([]);
    const [modalType, setModalType] = useState('new');

    const changeHandler = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const createTodo = async () => {
        await request.realtime.create('todos', [
            {
                name: 'title',
                value: formValues.title
            },
            {
                name: 'completed',
                value: formValues.completed
            }
        ]);
    }

    request.realtime.listener('create', (todo) => {
        console.log("CREATED REALTIME TODO", todo)
        if (todo.statusCode === 201) {
            setTodos([...todos, todo.data]);
            setOpen(false)
        }
    })
    
    request.realtime.listener('update', (todo) => {
        console.log("UPDATED REALTIME TODO", todo)
        if (todo.statusCode === 200) {
            const copyTodos = [...todos]
            const currentIndex = copyTodos.findIndex((copyTodo) => copyTodo.id === todo.data?.id)
            if (~currentIndex) copyTodos.splice(currentIndex, 1, todo.data);
            setTodos(copyTodos)
            setOpen(false)
        }
    })
    
    request.realtime.listener('remove', (todo) => {
        console.log("REMOVE REALTIME TODO", todo)
        if (todo.statusCode === 200) {
            const copyTodos = [...todos]
            const currentIndex = copyTodos.findIndex((copyTodo) => copyTodo.id === todo.data?.id)
            if (~currentIndex) copyTodos.splice(currentIndex, 1);
            setTodos(copyTodos)
        }
    })

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

    const updateTodo = async (data) => {
        await request.realtime.update('todos', {
            where: {
                id: data.id
            },
            columns: [
                {
                    name: 'title',
                    value: formValues.title
                },
                {
                    name: 'completed',
                    value: formValues.completed
                }
            ]
        })
    }

    const openModal = (values, type) => {
        setFormValues(values)
        setOpen(true)
        setModalType(type)
    }

    const saveHandler = (event, data) => {
        event.preventDefault()

        if (modalType === 'new') {
            createTodo()
        } else {
            updateTodo(data)
        }
    }

    const closeModal = () => {
        setOpen(false)
    }

    const deleteHandler = async (values) => {
        await request.realtime.remove('todos', {
            where: {
                id: values.id
            },
        });
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

export default Realtime;