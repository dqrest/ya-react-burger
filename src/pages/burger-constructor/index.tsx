import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// components
import { BurgerIngredients, BurgerConstructor } from '../../components';

// styles
import { appStyle } from '../../components';

export const BurgerContructorPage = () => (
    <>
        <span className='text text_type_main-large'>
            Соберите бургер
        </span>

        <div className={`${appStyle.appBurgerMain}`}>
            <DndProvider backend={HTML5Backend}>
                <div className={`${appStyle.appBurgerSection} ${appStyle.appBurgerFirstSection}`}>
                    <BurgerIngredients />
                </div>
                <div className={appStyle.appBurgerSection}>
                    <BurgerConstructor />
                </div>
            </DndProvider>
        </div>
    </>
    

);