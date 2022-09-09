import {Select, Form} from "antd";
import {useAppSelector} from "../../hooks";
import {selectCategories} from "../../store/selectors/categorySelectors";
import {CategoryType} from "../../types/categoryTypes";
import {DefaultSelectorEnum} from "../../enums/utilsEnum";

type Props = {
    defaultValue?: number
    onChange?: (values: any) => void
    label: string
}

const CategorySelectorFormItem = ({defaultValue = 0, onChange, label}: Props): JSX.Element => {
    const { Option } = Select;

    const categories: CategoryType[] = useAppSelector(selectCategories);

    return (
        <Form.Item
            name={"categoryId"}
            label={label}
            initialValue={defaultValue}
        >
            <Select onChange={onChange} style={{ width: 120 }}>
                <Option key={0} value={0}>None</Option>
                {
                    categories.map((category: CategoryType) =>
                        <Option key={category.id} value={category.id}>{category.name}</Option>
                    )
                }
            </Select>
        </Form.Item>
    )
}

export default CategorySelectorFormItem;