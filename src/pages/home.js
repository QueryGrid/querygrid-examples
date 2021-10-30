import request from "../services/request";

const Home = () => {
    const createTodo = async (event) => {
        event.preventDefault();
        const todo = await request.create('todos', [
            {
                name: 'title',
                type: 'string',
                value: 'learn react'
            },
            {
                name: 'completed',
                type: 'string',
                value: 'false'
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
        const todo = await request.update('todos', {
            where: {
                completed: 'false'
            },
            columns: [
                {
                    name: 'description',
                    value: 'lorem ipsum'
                },
                {
                    name: "mask",
                    value: "future"
                },
                {
                    name: "friend",
                    value: "preacher"
                },
                {
                    name: 'username',
                    value: 'lorem'
                },
                {
                    name: 'completed',
                    value: 'true'
                }
            ]
        })

        console.log("UPDATED TODO", todo)
    }
    return (
        <div>
            <form onSubmit={updateTodo}>
                <input type="text" placeholder="title" name="title" />
                <select name="completed">
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <button>Create Todo</button>
            </form>
        </div>
    )
}

export default Home