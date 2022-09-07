import {Table} from "antd";
import { Typography } from 'antd';
import {ColumnsType} from "antd/es/table";

type DataType = {
    key: number
    description: string
    doneTime: string
    category: string
}

const CompletedTodos = (): JSX.Element => {
    const columns: ColumnsType<DataType> = [
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
                        Delete
                    </>
                )
            }
        },
    ]

    return (
        <>
            <Typography.Title level={4}>UnCompleted Todos</Typography.Title>
            <Table columns={columns} />
        </>
    )
}

export default CompletedTodos;