import {Button, Col, DatePicker, Form, FormInstance, Input, Row} from "antd";
import {DefaultSelectorEnum} from "../../enums/utilsEnum";
import moment from "moment";
import CategorySelectorFormItem from "../category/CategorySelectorFormItem";

export type TodoFormPayload = {
    description?: string
    deadline?: string
    categoryId?: number
}

type Props = {
    onFinish: (values: any) => void
    onCategorySelectChange?: (values: any) => void
    form: FormInstance
}

const TodoForm = ({onFinish, onCategorySelectChange, form}: Props): JSX.Element => {
    return (
        <>
            <Form
                onFinish={onFinish}
                layout="vertical"
                form={form}
                autoComplete={'off'}
            >
                <Form.Item
                    name="id"
                    hidden={true}
                >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label={"Description"}
                    name={"description"}
                    rules={[{required: true, message: 'Please provide description'}]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Deadline"}
                    name={"deadline"}
                >
                    <DatePicker />
                </Form.Item>

                <CategorySelectorFormItem
                    onChange={onCategorySelectChange}
                    label={'Category'}
                />

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