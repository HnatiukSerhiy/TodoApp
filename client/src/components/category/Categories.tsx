import {Table} from "antd";
import {ColumnsType} from "antd/es/table";

type DataType = {
    key: number
    name: string
}

export const Categories = (): JSX.Element => {
    const columns: ColumnsType<DataType> = [
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
                    <>
                        Update
                        Delete
                    </>
                )
            }
        },
    ]

    return (
        <Table columns={columns} />
    )
}