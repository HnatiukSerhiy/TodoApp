import {Modal} from "antd";
import TodoForm, {TodoFormPayload} from "../todoForm/TodoForm";

type Props = {
    visible: boolean
    title: string
    onOkModal: () => void
    onCancelModal: () => void
    onFormFinish: (values: any) => void
    formPayload: TodoFormPayload
}

const TodoModal = ({visible, onOkModal, onCancelModal, title, onFormFinish, formPayload}: Props): JSX.Element => {

    return (
        <Modal
            title={title}
            visible={visible}
            onOk={onOkModal}
            onCancel={onCancelModal}
            footer={null}
        >
            <TodoForm
                onFinish={onFormFinish}
                fromPayload={formPayload}
            />
        </Modal>
    )
}

export default TodoModal;