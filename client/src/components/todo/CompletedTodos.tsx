import {Table} from "antd";
import { Typography } from 'antd';
import {ColumnsType} from "antd/es/table";

type DataType = {
    key: number
    description: string
    deadline: string
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
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline'
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
                        Solve
                        Update
                        Delete
                    </>
                )
            }
        },
    ]


    return (
        <>
            <Typography.Title level={4}>Completed Todos</Typography.Title>
            <Table columns={columns} />
        </>
    )
}

export default CompletedTodos;