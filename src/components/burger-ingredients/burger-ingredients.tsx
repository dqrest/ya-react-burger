import { useMemo, useState, useRef, UIEvent } from 'react';
import { useSelector } from '../../services/hooks';

import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

// components
import BurgerIngredientsList from '../burger-ingredients-list/burger-ingredients-list';

// shared
import { TIngredient } from '../../shared/types/ingredient-type';
import { useIngredients } from '../../services/selectors/burger-incredients';

// styles
import appStyle from '../app/app.module.css';

export default function BurgerIngredients() {

    const [currentTab, setCurrentTab] = useState<TIngredient>(TIngredient.Bun);

    const bunTitleRef = useRef<HTMLSpanElement>(null);
    const sauceTitleRef = useRef<HTMLSpanElement>(null);
    const mainTitleRef = useRef<HTMLSpanElement>(null);

    const { items: ingredients
        , itemsRequest: ingredientsRequest
        , itemsFailed: ingredientsFailed 
    } = useSelector(useIngredients);

    const buns = useMemo(() => ingredients?.filter(b => b.type === TIngredient.Bun) || [], [ingredients]);
    const sauces = useMemo(() => ingredients?.filter(b => b.type === TIngredient.Sauce) || [], [ingredients]);
    const mains = useMemo(() => ingredients?.filter(b => b.type === TIngredient.Main) || [], [ingredients]);

    function tabClick(tab: string) {
        const type = tab as TIngredient;
        setCurrentTab(type);
        tab === TIngredient.Bun && bunTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
        tab === TIngredient.Sauce && sauceTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
        tab === TIngredient.Main && mainTitleRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }

    function handleScroll(e: UIEvent<HTMLDivElement>) {
        const bunY = bunTitleRef?.current?.getBoundingClientRect()?.y || 0;
        const sauceY = sauceTitleRef?.current?.getBoundingClientRect()?.y || 0;
        const mainY = mainTitleRef?.current?.getBoundingClientRect()?.y || 0;
        const y = e?.currentTarget?.getBoundingClientRect()?.y || 0;
        const d1 = Math.abs(y - bunY),
            d2 = Math.abs(y - sauceY),
            d3 = Math.abs(y - mainY);
        if (d1 <= d2 && d1 <= d3) {
            currentTab !== TIngredient.Bun && setCurrentTab(TIngredient.Bun);
            return;
        }
        if (d2 <= d3) {
            currentTab !== TIngredient.Sauce && setCurrentTab(TIngredient.Sauce);
            return;
        }
        currentTab !== TIngredient.Main && setCurrentTab(TIngredient.Main);
    }

    return (
        <>
            {ingredientsRequest && 'Загрузка данных...'}
            {ingredientsFailed && `Произошла ошибка при получении списка инградиентов.`}
            {!ingredientsRequest && !ingredientsFailed && (
                <>
                    <div data-testid="ingredientsTab" className={appStyle.appBurgerTabs}>
                        <Tab value={TIngredient.Bun} active={currentTab === TIngredient.Bun} onClick={tabClick}>
                            Булки
                        </Tab>
                        <Tab value={TIngredient.Sauce} active={currentTab === TIngredient.Sauce} onClick={tabClick}>
                            Соусы
                        </Tab>
                        <Tab value={TIngredient.Main} active={currentTab === TIngredient.Main} onClick={tabClick}>
                            Начинки
                        </Tab>
                    </div>
                    <div className={`${appStyle.appBurgerSectionScrollingContent} custom-scroll`} onScroll={handleScroll}>
                        <BurgerIngredientsList title="Булки" ingredients={buns} ref={bunTitleRef} titleDataTestId="bunTitle"></BurgerIngredientsList>
                        <BurgerIngredientsList title="Соусы" ingredients={sauces} ref={sauceTitleRef} titleDataTestId="saucesTitle"></BurgerIngredientsList>
                        <BurgerIngredientsList title="Начинки" ingredients={mains} ref={mainTitleRef} titleDataTestId="mainsTitle"></BurgerIngredientsList>
                    </div>
                </>
            )}
        </>
    );
}
