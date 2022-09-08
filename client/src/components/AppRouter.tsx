import {Routes, Route} from 'react-router-dom';
import {Path} from "../enums/path";
import TodoPage from "../pages/TodoPage";
import CategoryPage from "../pages/CategoryPage";

const AppRouter = (): JSX.Element => {
    return (
        <Routes>
            <Route index element={<TodoPage />}/>
            <Route path={Path.Todos} element={<TodoPage />}/>
            <Route path={Path.Categories} element={<CategoryPage />}/>
        </Routes>
    )
}

export default AppRouter;