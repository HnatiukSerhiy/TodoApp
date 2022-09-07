import {Button, Col, Form, Input, Row, Select} from "antd";

export type TodoFormPayload = {
    description?: string
    deadline?: string
    categoryId?: number
}

type Props = {
    fromPayload: TodoFormPayload
    onFinish: (values: any) => void
}

const TodoForm = ({fromPayload, onFinish}: Props): JSX.Element => {
    return (
        <>
            <Form onFinish={onFinish}>
                <Form.Item
                    label={"Description"}
                    name={"description"}
                    rules={[{required: true, message: 'Please provide description'}]}
                    initialValue={fromPayload.description}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Deadline"}
                    name={"deadline"}
                    initialValue={fromPayload.deadline}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Category"}
                    name={"categoryId"}
                    initialValue={fromPayload.categoryId === undefined ? '1' : fromPayload.categoryId}
                >
                    <Select>
                        <Select.Option value={'1'}>demo</Select.Option>
                    </Select>
                </Form.Item>
                <Row justify={'end'}>
                    <Col>
                        <Form.Item>
                            <Button type="primary" htmlType={'submit'}>Submit</Button>
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </>
    )
}

export default TodoForm;