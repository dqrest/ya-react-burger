import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import { HomePage, BurgerContructorPage } from '../../pages';


export default function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />}>
                    <Route path="" element={<BurgerContructorPage/> }/>
                </Route>
            </Routes>
        </Router>        
    );
}
