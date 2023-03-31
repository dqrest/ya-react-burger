import React from 'react';
import './App.css';

// components
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';


function App() {
    return (
        <section className="app-burder">
            <AppHeader></AppHeader>
            <main className="app-burger-paddings">
                

            </main>

            {/* <AppHeader></AppHeader>
            <BurgerIngredients /> */}
        </section>
    );
}

export default App;
