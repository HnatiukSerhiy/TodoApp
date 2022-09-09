import {Button, Form, FormInstance, Modal, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {CategoriesDisplayData, getCategoriesDisplayData} from "../../utils/getDisplayData";
import {CategoryType, UpdateCategoryType} from "../../types/categoryTypes";
import {useActions, useAppSelector} from "../../hooks";
import CategoryModal from "./CategoryModal";
import {useState} from "react";
import {selectLoading} from "../../store/selectors/loadingSelectors";

type Props = {
    data: CategoryType[]
}

export const Categories = ({data}: Props): JSX.Element => {
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);

    const { updateCategoryApiAction, deleteCategoryApiAction } = useActions()
    const { confirm } = Modal;
    const [form] = Form.useForm();

    const openConfirmModal = (id: number) => {
        confirm({
            title: 'Warning',
            content: 'Are you sure you want to delete this category?',
            centered: true,
            onOk() {
                deleteCategoryApiAction(id);
            },
            onCancel() {}
        })
    }

    const onDeleteClick = (id: number) => openConfirmModal(id);

    const onUpdateClick = (category: CategoriesDisplayData) => {
        form.setFieldsValue({
            id: category.key,
            name: category.name
        })

        setEditModalVisible(true);
    }

    const onSubmitEditModal = (category: UpdateCategoryType) => {
        updateCategoryApiAction(category);
        setEditModalVisible(false);
    }

    const onCancelEditModal = () => setEditModalVisible(false);

    const columns: ColumnsType<CategoriesDisplayData> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 50}}>
                        <div>
                            <Button type={'text'} onClick={() => onUpdateClick(record)}>Update</Button>
                        </div>
                        <div>
                            <Button type={'text'} onClick={() => onDeleteClick(record.key)}>Delete</Button>
                        </div>
                    </div>
                )
            }
        },
    ]

    const isLoading = useAppSelector(selectLoading).isCategoriesLoading;
    const displayData = getCategoriesDisplayData(data);

    return (
        <>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={displayData}
                pagination={false}
            />
            <CategoryModal
                visible={isEditModalVisible}
                title={'Update category'}
                onCancelModal={onCancelEditModal}
                onFormFinish={onSubmitEditModal}
                form={form}
            />
        </>
    )
}