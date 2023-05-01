import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages
import { AppPage, BurgerContructorPage } from '../../pages';


export default function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<AppPage />}>
                    <Route path="" element={<BurgerContructorPage/> }/>
                </Route>
            </Routes>
        </Router>        
    );
}
