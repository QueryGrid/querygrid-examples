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
    return (
        <div>
            <form onSubmit={createTodo}>
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