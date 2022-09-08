import {Button, Col, Row, Table} from "antd";
import {Categories} from "../components/category/Categories";
import {useState} from "react";
import CategoryModal from "../components/category/CategoryModal";

const CategoryPage = (): JSX.Element => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const onCancelModal = () => {
        setModalVisible(false);
    }

    const onClick = () => {
        setModalVisible(true);
    }

    const onFormFinish = (values: any) => {
        console.log(values);
        setModalVisible(false);
    }

    return (
        <>
            <Row justify={'end'} style={{marginBottom: 30}}>
                <Col>
                    <Button type={'primary'} onClick={onClick}>Add Category</Button>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col span={12}>
                    <Categories />
                </Col>
            </Row>
            <CategoryModal
                visible={isModalVisible}
                title={'Add category'}
                onCancelModal={onCancelModal}
                onFormFinish={onFormFinish}
                formPayload={{}}
            />
        </>
    )
}

export default CategoryPage;