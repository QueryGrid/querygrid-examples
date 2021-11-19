import {Button, Card, FormGroup, Input} from "reactstrap";

const Todo = ({ data, openModal, deleteHandler }) => {
    return (
        <Card style={{ flexDirection: 'row', minHeight: '50px', alignItems: 'center', padding: '5px 20px', marginBottom: '5px' }}>
            <FormGroup check>
                <Input
                    check={data?.completed}
                    id="completed"
                    name="check"
                    type="checkbox"
                />
            </FormGroup>
            <p style={{ marginBottom: '0px', marginLeft: '20px'}}>{data?.title}</p>
            <div style={{ marginLeft: 'auto'}}>
                <Button color="warning" size="sm" style={{color: '#fff', marginRight: '10px'}} onClick={() => openModal(data, 'edit')}>
                    Edit
                </Button>
                <Button color="danger" size="sm" style={{color: '#fff'}} onClick={() => deleteHandler(data)}>
                    Delete
                </Button>
            </div>
        </Card>
    )
}

export default Todo;