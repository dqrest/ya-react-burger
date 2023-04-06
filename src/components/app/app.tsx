// data
import { burgers } from '../../utils/data';

// components
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

// styles
import appStyle from './app.module.css';

function App() {
    return (
        <>
            <AppHeader></AppHeader>
            <div className={`${appStyle.appBurgerPaddings} pb-5 pt-10`}>
                <span className='text text_type_main-large'>
                    Соберите бургер
                </span>
            </div>
            <main className={`${appStyle.appBurgerPaddings} ${appStyle.appBurgerMain}`}>
                <div className={`${appStyle.appBurgerSection} ${appStyle.appBurgerFirstSection}`}>
                    <BurgerIngredients burgers={burgers} />
                </div>
                <div className={appStyle.appBurgerSection}>
                    <BurgerConstructor burgers={burgers} />
                </div>               
            </main>
        </>
    );
}

export default App;