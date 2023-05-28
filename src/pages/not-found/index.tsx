import { Link } from 'react-router-dom';

// styles
import styles from '../pages.module.css';

export const NotFound404Page = () => (
    <div className={styles.wrapper}>
        <span className="text text_type_main-medium">
            Oops! Ошибка 404
        </span>
        <span className="text text_type_main-default">
            Запрашиваемая страница несуществует
        </span>        
        <span className="text text_type_main-small mt-10">проверьте адрес или перейдите на <Link to='/' className={styles.link}>домашнюю страницу</Link></span>
    </div>
);