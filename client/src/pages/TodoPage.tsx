import {Button, Col, Modal, Row, Select, Tooltip} from "antd";
import CompletedTodos from "../components/todo/CompletedTodos";
import UnCompletedTodos from "../components/todo/UnCompletedTodos";
import {useState} from "react";
import TodoModal from "../components/todo/TodoModal";

const TodoPage = (): JSX.Element => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const onOkModal = () => {
        setModalVisible(false);
    }

    const onCancelModal = () => {
        setModalVisible(false);
    }

    const addTodoPayload = {
        description: undefined,
        deadline: undefined,
        categoryId: undefined
    }

    const onAddTodoFinish = (values: any) => {
        console.log(values);
    }

    return (
        <>
            <Row justify={'end'} style={{marginBottom: 30}}>
                <Col>
                    <Button
                        type={'primary'}
                        onClick={() => setModalVisible(true)}
                    >
                        Add Todo
                    </Button>
                </Col>
            </Row>
            <Row style={{marginBottom: 30}}>
                <Col>
                    <Tooltip title="Filter todos by category">
                        <Select defaultValue={'1'} style={{ width: 120 }}>
                            <Select.Option value={'1'}>Home</Select.Option>
                            <Select.Option value={'2'}>Education</Select.Option>
                            <Select.Option value={'3'}>Work</Select.Option>
                        </Select>
                    </Tooltip>
                </Col>
            </Row>
            <Row style={{marginBottom: 30}}>
                <Col span={24}>
                    <CompletedTodos />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <UnCompletedTodos />
                </Col>
            </Row>
            <TodoModal
                title={'Add todo'}
                visible={isModalVisible}
                onOkModal={onOkModal}
                onCancelModal={onCancelModal}
                formPayload={addTodoPayload}
                onFormFinish={onAddTodoFinish}
            />
        </>
    )
}

export default TodoPage;