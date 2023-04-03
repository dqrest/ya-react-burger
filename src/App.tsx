import React from 'react';
import './App.css';

// components
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';


function App() {
    return (
        <>
            <AppHeader></AppHeader>
            <main className='app-burger-paddings app-burger-main'>
                <span className={`text text_type_main-large`}>
                    Соберите бургер
                </span>
                <br></br>
                <BurgerIngredients />
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
