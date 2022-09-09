import {Button, Col, Form, FormInstance, Modal, Row, Table} from "antd";
import { Typography } from 'antd';
import {ColumnsType} from "antd/es/table";
import {useState} from "react";
import {AddTodoFormType, TodoType, UpdateTodoFormType} from "../../types/todoTypes";
import {UnCompletedTodosDisplayData, getUnCompletedTodosDisplayData} from "../../utils/getDisplayData";
import {useActions, useAppSelector} from "../../hooks";
import TodoModal from "./TodoModal";
import {selectCategories} from "../../store/selectors/categorySelectors";
import {getAddTodoPayloadFromFormInput, getUpdateTodoPayloadFromFormInput} from "../../utils/converters";
import moment from "moment";
import {selectLoading} from "../../store/selectors/loadingSelectors";

type Props = {
    data: TodoType[]
}

type EditTodoPayload = {
    id?: number
    description?: string
    deadline?: string
    categoryId?: number
}

const UnCompletedTodos = ({data}: Props): JSX.Element => {
    const [isEditModalVisible, setEditModalVisible] = useState<boolean>(false);

    const { confirm } = Modal;
    const [form] = Form.useForm();

    const { deleteTodoApiAction, solveTodoApiAction, updateTodoApiAction } = useActions();

    const openConfirmModal = (id: number) => {
        confirm({
            title: 'Warning',
            content: 'Are you sure you want to delete this todo item?',
            centered: true,
            onOk() {
                deleteTodoApiAction(id);
            },
            onCancel() {}
        })
    }

    const categories = useAppSelector(selectCategories);

    const onUpdateClick = (record: UnCompletedTodosDisplayData) => {
        const categoriesWithSameName = categories.filter(category => category.name === record.category);

        form.setFieldsValue({
            id: record.key,
            description: record.description,
            deadline: record.deadline ? moment(`${record.deadline}`, 'YYYY-MM-DD') : undefined,
            categoryId: categoriesWithSameName.length !== 0 ? categoriesWithSameName[0].id : 0
        })

        moment(`${record.deadline}`, 'YYYY-MM-DD')

        setEditModalVisible(true);
    }

    const onSolveClick = (id: number) => {
        solveTodoApiAction(id);
    }

    const onDeleteClick = (id: number) => openConfirmModal(id);

    const onCancelEditModal = () => setEditModalVisible(false);

    const onSubmitEditModal = (todo: UpdateTodoFormType) => {
        updateTodoApiAction(getUpdateTodoPayloadFromFormInput(todo));
        setEditModalVisible(false);
    }

    const columns: ColumnsType<UnCompletedTodosDisplayData> = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline'
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <div style={{display: 'flex', justifyContent: 'space-between', width: 50}}>
                        <div>
                            <Button type={'text'} onClick={() => onSolveClick(record.key)}>Solve</Button>
                        </div>
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

    const isLoading = useAppSelector(selectLoading).isUnCompletedTodosLoading;
    const displayData = getUnCompletedTodosDisplayData(data);

    return (
        <>
            <Typography.Title level={4}>UnCompleted Todos</Typography.Title>
            <Table
                columns={columns}
                dataSource={displayData}
                pagination={false}
                loading={isLoading}
            />
            <TodoModal
                visible={isEditModalVisible} 
                title={'Update todo'}
                onCancelModal={onCancelEditModal}
                onFormFinish={onSubmitEditModal}
                form={form}
            />
        </>
    )
}

export default UnCompletedTodos;