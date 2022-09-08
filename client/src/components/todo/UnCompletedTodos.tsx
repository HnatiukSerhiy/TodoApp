import {Button, Col, Modal, Row, Table} from "antd";
import { Typography } from 'antd';
import {ColumnsType} from "antd/es/table";
import {useState} from "react";
import {AddTodoFormType, TodoType, UpdateTodoFormType} from "../../types/todoTypes";
import {UnCompletedTodosDisplayData, getUnCompletedTodosDisplayData} from "../../utils/getDisplayData";
import {useActions, useAppSelector} from "../../hooks";
import TodoModal from "./TodoModal";
import {selectCategories} from "../../store/selectors/categorySelectors";
import {getAddTodoPayloadFromFormInput, getUpdateTodoPayloadFromFormInput} from "../../utils/converters";

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
    const [editTodoModalPayload, setEditTodoModalPayload] = useState<EditTodoPayload>({});

    const {confirm} = Modal;

    const { deleteTodoApiAction, solveTodoApiAction, updateTodoApiAction } = useActions();

    const openConfirmModal = (id: number) => {
        confirm({
            title: 'Warning',
            content: 'Are you sure you want to delete this todo item?',
            centered: true,
            onOk() {
                // deleteTodoApiAction(id);
            },
            onCancel() {}
        })
    }

    const categories = useAppSelector(selectCategories);

    const onUpdateClick = (record: UnCompletedTodosDisplayData) => {
        const categoriesWithSameName = categories.filter(category => category.name === record.category);

        setEditTodoModalPayload({
            id: record.key,
            description: record.description,
            deadline: record.deadline,
            categoryId: categoriesWithSameName[0].id
        } as EditTodoPayload);
        setEditModalVisible(true);
    }

    const onSolveClick = (id: number) => solveTodoApiAction(id);
    const onDeleteClick = (id: number) => openConfirmModal(id);

    const onCancelEditModal = () => {
        setEditModalVisible(false);
        setEditTodoModalPayload({});
    }

    const onSubmitEditModal = (todo: UpdateTodoFormType) => {
        updateTodoApiAction(getUpdateTodoPayloadFromFormInput(todo));
        setEditTodoModalPayload({});
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

    const displayData = getUnCompletedTodosDisplayData(data);

    return (
        <>
            <Typography.Title level={4}>Completed Todos</Typography.Title>
            <Table columns={columns}  dataSource={displayData} pagination={false} />
            <TodoModal 
                visible={isEditModalVisible} 
                title={'Update todo'}
                onCancelModal={onCancelEditModal}
                onFormFinish={onSubmitEditModal}
                formPayload={editTodoModalPayload}
            />
        </>
    )
}

export default UnCompletedTodos;