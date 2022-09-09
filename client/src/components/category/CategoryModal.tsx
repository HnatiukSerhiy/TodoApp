import {FormInstance, Modal} from "antd";
import CategoryForm from "./CategoryForm";

type Props = {
    visible: boolean
    title: string
    onCancelModal: () => void
    onFormFinish: (values: any) => void
    form: FormInstance
}

const CategoryModal = ({visible, onCancelModal, title, onFormFinish, form}: Props): JSX.Element => {

    return (
        <Modal
            forceRender={true}
            title={title}
            visible={visible}
            onCancel={onCancelModal}
            footer={null}
            destroyOnClose={true}
        >
            <CategoryForm
                form={form}
                onFinish={onFormFinish}
            />
        </Modal>
    )
}

export default CategoryModal;