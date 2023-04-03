import React from 'react';
import './App.css';

// data
import {burgers} from './utils/data';

// components
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';


function App() {
    return (
        <>
            <AppHeader></AppHeader>
            <main className='app-burger-paddings app-burger-main pb-5 pt-5'>
                <span className={`text text_type_main-large`}>
                    Соберите бургер
                </span>
                <br></br>
                <div className='app-burger-section'>
                    <BurgerIngredients />
                </div>
                <div className='app-burger-section'>
                    <BurgerConstructor burgers={burgers}></BurgerConstructor>
                </div>
                {/* <BurgerIngredients /> */}
            </main>
        </>
    );
}

export default App;


// <section className="app-burder">
//     <AppHeader></AppHeader>
//     <main className="app-burger-paddings">


//     </main>

//     <AppHeader></AppHeader>
//     <BurgerIngredients />
// </section>
