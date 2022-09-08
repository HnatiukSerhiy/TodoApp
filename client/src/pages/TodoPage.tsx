import {Button, Col, Form, Row} from "antd";
import {useEffect, useState} from "react";
import TodoModal from "../components/todo/TodoModal";
import CategorySelectorFormItem from "../components/category/CategorySelectorFormItem";
import {useActions, useAppSelector} from "../hooks";
import {selectCompletedTodos, selectUnCompletedTodos} from "../store/selectors/todoSelectors";
import UnCompletedTodos from "../components/todo/UnCompletedTodos";
import CompletedTodos from "../components/todo/CompletedTodos";
import {AddTodoFormType} from "../types/todoTypes";
import {getAddTodoPayloadFromFormInput} from "../utils/converters";
import {selectDataProvider} from "../store/selectors/dataProviderSelectors";

const TodoPage = (): JSX.Element => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const [categoryFilterValue, setCategoryFilterValue] = useState<string | undefined>(undefined);

    const { getCompletedTodosApiAction, getUnCompletedTodosApiAction, addTodoApiAction } = useActions();

    const onCancelModal = () => setModalVisible(false);
    const onFilterChange = (value: any) => setCategoryFilterValue(value);

    const onAddTodoFinish = (todo: AddTodoFormType) => {
        addTodoApiAction(getAddTodoPayloadFromFormInput(todo));
        setModalVisible(false);
    }

    const dataProvider = useAppSelector(selectDataProvider);

    useEffect(() => {
        /*const categoryId = categoryFilterValue !== DefaultSelectorEnum.defaultCategorySelectorValue ?
            Number(categoryFilterValue) : undefined;

        getCompletedTodosApiAction(categoryId);
        getUnCompletedTodosApiAction(categoryId);*/
    }, [categoryFilterValue, dataProvider]);

    const completedTodos = useAppSelector(selectCompletedTodos);
    const unCompletedTodos = useAppSelector(selectUnCompletedTodos);

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
                    <Form>
                        <CategorySelectorFormItem
                            onChange={onFilterChange}
                            defaultValue={0}
                            label={''}
                        />
                    </Form>
                </Col>
            </Row>
            <Row style={{marginBottom: 30}}>
                <Col span={24}>
                    <UnCompletedTodos data={unCompletedTodos} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <CompletedTodos data={completedTodos} />
                </Col>
            </Row>
            <TodoModal
                title={'Add todo'}
                visible={isModalVisible}
                onCancelModal={onCancelModal}
                onFormFinish={onAddTodoFinish}
                formPayload={{}}
            />
        </>
    )
}

export default TodoPage;