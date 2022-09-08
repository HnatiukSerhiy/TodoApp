import {Button, Col, DatePicker, Form, Input, Row} from "antd";
import {DefaultSelectorEnum} from "../../enums/utilsEnum";
import moment from "moment";
import CategorySelectorFormItem from "../category/CategorySelectorFormItem";

export type TodoFormPayload = {
    description?: string
    deadline?: string
    categoryId?: number
}

type Props = {
    formPayload: TodoFormPayload
    onFinish: (values: any) => void
    onCategorySelectChange?: (values: any) => void
}

const TodoForm = ({formPayload, onFinish, onCategorySelectChange}: Props): JSX.Element => {
    return (
        <>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    label={"Description"}
                    name={"description"}
                    rules={[{required: true, message: 'Please provide description'}]}
                    initialValue={formPayload.description}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label={"Deadline"}
                    name={"deadline"}
                    initialValue={formPayload.deadline === undefined ? undefined :
                        moment(`${formPayload.deadline}`, 'YYYY-MM-DD')}
                >
                    <DatePicker />
                </Form.Item>

                <CategorySelectorFormItem
                    defaultValue={formPayload.categoryId === undefined ? 0 : formPayload.categoryId}
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