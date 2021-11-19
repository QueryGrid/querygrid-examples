import {Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const FormModal = ({open, toggleModal, changeHandler, saveHandler, formValues}) => {
    return (
        <Modal
            isOpen={open}
            size=""
            toggle={toggleModal}
        >
            <ModalHeader toggle={function noRefCheck(){}}>
                Todo
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="title">
                            Title
                        </Label>
                        <Input
                            id="title"
                            name="title"
                            placeholder="title"
                            type="text"
                            value={formValues?.title}
                            onChange={changeHandler}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="completed">
                            Completed
                        </Label>
                        <Input id="completed" name="completed" type="select" onChange={changeHandler} value={formValues?.completed}>
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={saveHandler}>
                    Save
                </Button>
                <Button onClick={toggleModal}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default FormModal;