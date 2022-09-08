import {Modal} from "antd";
import CategoryForm, {CategoryFormPayload} from "./CategoryForm";

type Props = {
    visible: boolean
    title: string
    onCancelModal: () => void
    onFormFinish: (values: any) => void
    formPayload: CategoryFormPayload
}

const CategoryModal = ({visible, onCancelModal, title, onFormFinish, formPayload}: Props): JSX.Element => {

    return (
        <Modal
            title={title}
            visible={visible}
            onCancel={onCancelModal}
            footer={null}
        >
            <CategoryForm
                onFinish={onFormFinish}
                formPayload={formPayload}
            />
        </Modal>
    )
}

export default CategoryModal;