import {Button, Col, Row, Table} from "antd";
import {Categories} from "../components/category/Categories";

const CategoryPage = (): JSX.Element => {
    return (
        <>
            <Row justify={'end'} style={{marginBottom: 30}}>
                <Col>
                    <Button type={'primary'}>Add Category</Button>
                </Col>
            </Row>
            <Row justify={'center'}>
                <Col span={12}>
                    <Categories />
                </Col>
            </Row>
        </>
    )
}

export default CategoryPage;