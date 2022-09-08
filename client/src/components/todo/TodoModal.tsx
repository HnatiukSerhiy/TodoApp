import {Modal} from "antd";
import TodoForm, {TodoFormPayload} from "./TodoForm";

type Props = {
    visible: boolean
    title: string
    onCancelModal: () => void
    onFormFinish: (values: any) => void
    formPayload: TodoFormPayload
}

const TodoModal = ({visible, onCancelModal, title, onFormFinish, formPayload}: Props): JSX.Element => {

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancelModal}
            footer={null}
        >
            <TodoForm
                onFinish={onFormFinish}
                formPayload={formPayload}
            />
        </Modal>
    )
}

export default TodoModal;