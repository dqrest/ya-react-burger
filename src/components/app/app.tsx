// components
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';

// styles
import appStyle from './app.module.css';

export default function App() {       

    return (
        <ErrorBoundary>
            <AppHeader></AppHeader>
            <div className={`${appStyle.appBurgerPaddings} pb-5 pt-10`}>
                <span className='text text_type_main-large'>
                    Соберите бургер
                </span>
            </div>
            <main className={`${appStyle.appBurgerPaddings} ${appStyle.appBurgerMain}`}>
                <div className={`${appStyle.appBurgerSection} ${appStyle.appBurgerFirstSection}`}>
                    <BurgerIngredients />
                </div>
                <div className={appStyle.appBurgerSection}>
                    <BurgerConstructor />
                </div>
            </main>
        </ErrorBoundary>
    );
}
