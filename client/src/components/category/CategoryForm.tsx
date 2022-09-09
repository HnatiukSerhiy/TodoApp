import {Button, Col, Form, FormInstance, Input, Row} from "antd";

type Props = {
    onFinish: (values: any) => void
    form: FormInstance
}

const CategoryForm = ({onFinish, form}: Props): JSX.Element => {
    return (
        <Form
            onFinish={onFinish}
            layout={'vertical'}
            form={form}
            autoComplete='off'
        >
            <Form.Item
                name="id"
                hidden={true}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label={'Name'}
                name={'name'}
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