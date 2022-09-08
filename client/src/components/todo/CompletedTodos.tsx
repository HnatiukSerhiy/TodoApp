import {Button, Table} from "antd";
import { Typography } from 'antd';
import {ColumnsType} from "antd/es/table";
import {useActions} from "../../hooks";
import {TodoType} from "../../types/todoTypes";
import {CompletedTodosDisplayData, getCompletedTodosDisplayData} from "../../utils/getDisplayData";

type Props = {
    data: TodoType[]
}

const CompletedTodos = ({data}: Props): JSX.Element => {
    const { deleteTodoApiAction } = useActions();

    const onDeleteClick = (id: number) => deleteTodoApiAction(id);

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

    const displayData = getCompletedTodosDisplayData(data)

    return (
        <>
            <Typography.Title level={4}>UnCompleted Todos</Typography.Title>
            <Table columns={columns} dataSource={displayData} pagination={false} />
        </>
    )
}

export default CompletedTodos;