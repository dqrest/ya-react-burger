import React from "react"

// components
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';

// styles
import appStyle from './app.module.css';

// api
import { getIngredients } from '../../utils/burger-api';
import { BurgerContext } from '../../shared/contexts/burger-context';

export default function App() {

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        burgers: []
    });    

    function getBurgers() {
        setState({ ...state, hasError: false, isLoading: true });
        getIngredients()
            .then(data => setState({ ...state, burgers: data.data, isLoading: false }))
            .catch(e => setState({ ...state, hasError: true, isLoading: false }));
    }

    React.useEffect(() => {
        const asyncGetBurgers = () => getBurgers();
        asyncGetBurgers();
    }, []);

    const { burgers, isLoading, hasError } = state;

    const burgersData = { burgers: burgers};

    return (
        <ErrorBoundary>
            <AppHeader></AppHeader>
            {isLoading && 'Загрузка данных...'}
            {hasError && `Произошла ошибка при получении данных по бургерам.`}
            {!isLoading && !hasError && (
                <>
                    <div className={`${appStyle.appBurgerPaddings} pb-5 pt-10`}>
                        <span className='text text_type_main-large'>
                            Соберите бургер
                        </span>
                    </div>
                    <main className={`${appStyle.appBurgerPaddings} ${appStyle.appBurgerMain}`}>
                        <BurgerContext.Provider value={burgersData}>
                            <div className={`${appStyle.appBurgerSection} ${appStyle.appBurgerFirstSection}`}>
                                <BurgerIngredients/>
                            </div>
                            <div className={appStyle.appBurgerSection}>
                                <BurgerConstructor/>
                            </div>
                        </BurgerContext.Provider>
                    </main>
                </>
            )}
        </ErrorBoundary>
    );
}
