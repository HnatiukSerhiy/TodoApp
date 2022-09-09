import {Button, Col, Form, FormInstance, Row} from "antd";
import {Categories} from "../components/category/Categories";
import {useEffect, useState} from "react";
import CategoryModal from "../components/category/CategoryModal";
import {useActions, useAppSelector} from "../hooks";
import {AddCategoryType} from "../types/categoryTypes";
import {selectCategories} from "../store/selectors/categorySelectors";

const CategoryPage = (): JSX.Element => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);
    const { addCategoryApiAction, getCategoriesApiAction } = useActions();
    const [form] = Form.useForm();

    useEffect(() => {
        // getCategoriesApiAction();
    }, []);

    const onAddButtonClick = () => setModalVisible(true);

    const onFormFinish = (category: AddCategoryType) => {
        addCategoryApiAction(category);
        setModalVisible(false);
        form.resetFields();
    }

    const onCancelModal = () => {
        setModalVisible(false);
        form.resetFields();
    }

    const categories = useAppSelector(selectCategories);

    return (
        <>
            <Row justify={'end'} style={{marginBottom: 30}}>
                <Col>
                    <Button type={'primary'} onClick={onAddButtonClick}>Add Category</Button>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col span={12}>
                    <Categories data={categories} />
                </Col>
            </Row>
            <CategoryModal
                visible={isModalVisible}
                title={'Add category'}
                onCancelModal={onCancelModal}
                onFormFinish={onFormFinish}
                form={form}
            />
        </>
    )
}

export default CategoryPage;