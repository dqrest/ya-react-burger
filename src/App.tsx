import React from 'react';
import './App.css';

// data
import { burgers } from './utils/data';

// components
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';


function App() {
    return (
        <>
            <AppHeader></AppHeader>
            <div className={`app-burger-paddings pb-5 pt-5`}>
                <span className='text text_type_main-large'>
                    Соберите бургер
                </span>
            </div>
            <main className='app-burger-paddings app-burger-main'>
                <div className='app-burger-section' style={{justifyContent: 'flex-start'}}>
                    <BurgerIngredients />
                </div>
                <div className='app-burger-section' style={{justifyContent: 'flex-end'}}>
                    <BurgerConstructor burgers={burgers} />
                </div>               
            </main>
        </>
    );
}

export default App;