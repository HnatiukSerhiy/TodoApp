import {Button, Col, Form, Input, Row} from "antd";

export type CategoryFormPayload = {
    name?: string
}

type Props = {
    formPayload: CategoryFormPayload
    onFinish: (values: any) => void
}

export const CategoryForm = ({formPayload, onFinish}: Props): JSX.Element => {
    return (
        <Form onFinish={onFinish} layout={'vertical'}>
            <Form.Item
                label={'Name'}
                name={'name'}
                initialValue={formPayload.name}
                rules={[{required: true, message: 'Please, provide name'}]}
            >
                <Input />
            </Form.Item>
            <Row justify={'end'}>
                <Col>
                    <Form.Item>
                        <Button type="primary" htmlType={'submit'}>Submit</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}

export default CategoryForm;