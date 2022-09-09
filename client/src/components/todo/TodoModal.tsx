import {FormInstance, Modal} from "antd";
import TodoForm, {TodoFormPayload} from "./TodoForm";

type Props = {
    visible: boolean
    title: string
    onCancelModal: () => void
    onFormFinish: (values: any) => void
    form: FormInstance
}

const TodoModal = ({visible, onCancelModal, title, onFormFinish, form}: Props): JSX.Element => {

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancelModal}
            footer={null}
            destroyOnClose={true}
            forceRender={true}
        >
            <TodoForm
                onFinish={onFormFinish}
                form={form}
            />
        </Modal>
    )
}

export default TodoModal;