import {Button, Modal, Table} from "antd";
import { Typography } from 'antd';
import {ColumnsType} from "antd/es/table";
import {useActions, useAppSelector} from "../../hooks";
import {TodoType} from "../../types/todoTypes";
import {CompletedTodosDisplayData, getCompletedTodosDisplayData} from "../../utils/getDisplayData";
import {selectLoading} from "../../store/selectors/loadingSelectors";

type Props = {
    data: TodoType[]
}

const CompletedTodos = ({data}: Props): JSX.Element => {
    const { deleteTodoApiAction } = useActions();
    const { confirm } = Modal;

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

    const onDeleteClick = (id: number) => openConfirmModal(id);

    const columns: ColumnsType<CompletedTodosDisplayData> = [
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'DoneTime',
            dataIndex: 'doneTime',
            key: 'doneTime'
        },
        {
            title: 'category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <>
                        <div>
                            <Button type={'text'} onClick={() => onDeleteClick(record.key)}>Delete</Button>
                        </div>
                    </>
                )
            }
        },
    ]

    const isLoading = useAppSelector(selectLoading).isCompletedTodosLoading;
    const displayData = getCompletedTodosDisplayData(data)

    return (
        <>
            <Typography.Title level={4}>Completed Todos</Typography.Title>
            <Table
                loading={isLoading}
                columns={columns}
                dataSource={displayData}
                pagination={false}
            />
        </>
    )
}

export default CompletedTodos;