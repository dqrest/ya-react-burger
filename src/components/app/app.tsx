import React from "react"

// components
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import ErrorBoundary from '../error-boundary/error-boundary';

// styles
import appStyle from './app.module.css';

const dataUrl = "https://norma.nomoreparties.space/api/ingredients";

export default function App() {

    const [state, setState] = React.useState({
        isLoading: false,
        hasError: false,
        burgers: []
    });

    function getBurgers() {
        setState({ ...state, hasError: false, isLoading: true });
        fetch(dataUrl)
            .then(res => res.json())
            .then(data => setState({ ...state, burgers: data.data, isLoading: false }))
            .catch(e => setState({ ...state, hasError: true, isLoading: false }));
    }

    React.useEffect(() => {
        const asyncGetBurgers = async () => getBurgers();
        asyncGetBurgers();
    }, []);

    const { burgers, isLoading, hasError } = state;

    return (
        <ErrorBoundary>
            <AppHeader></AppHeader>
            {isLoading && 'Загрузка данных...'}
            {hasError && `Произошла ошибка при получении данных по ${dataUrl}. Проверьте, пожалуйста, эту ссылку.`}
            {!isLoading && !hasError && (
                <>
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
            )}
        </ErrorBoundary>
    );
}
