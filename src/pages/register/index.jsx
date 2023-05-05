import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
    Input
    , PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { register  } from '../../services/actions/auth';

// styles
import styles from '../pages.module.css';


export const getUser = (store) => ({
    user: store?.register?.item
    , orderDetailsRequest: store?.register?.itemRequest
    , orderDetailsFailed: store?.register?.itemFailed
});

export const RegisterPage = () => {

    const dispatch = useDispatch();
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        name: 'snakbag'
        , password: 'snakbag12345!'
        , email: 'snakbag@mail.ru'
    });

    function registerClick(e) {
        debugger;
        e.preventDefault();  
        console.log('finish: ' + JSON.stringify(formData));  
        dispatch(register(formData));        
        return false;    
    }

    return (
        <div className={styles.wrapper}>
            <span className="text text_type_main-medium">
                Регистрация
            </span>
            <form style={{ display: 'flex', flexDirection: "column" }} onSubmit={registerClick}>
                <Input type={'text'}
                    value={formData.name}
                    placeholder={'Имя'}
                    required
                    onChange={e => { setFormData({ ...formData, name: e.target.value }); console.log(JSON.stringify(formData)); }}
                    extraClass="mb-4"
                />
                <EmailInput required
                    extraClass="mb-4"                    
                    value={formData.email}
                    onChange={e => { setFormData({ ...formData, email: e.target.value }); console.log(JSON.stringify(formData)); }}
                />
                <PasswordInput required
                    extraClass="mb-4"
                    value={formData.password}
                    onChange={e => { setFormData({ ...formData, password: e.target.value }); console.log(JSON.stringify(formData)); }}
                />
                <div style={{ alignSelf: "center" }}>
                    <Button htmlType="submit"
                        type="primary"
                        size="medium"
                        onClick={() => false}>
                        Зарегистрироваться
                    </Button>
                </div>
            </form>
            <span className="text text_type_main-small mt-10">
                Уже зарегистрированы?
                <Link
                    to={{ pathname: `/login` }}
                    className={`${styles.link} ml-4`}>
                    Войти
                </Link>
            </span>
        </div>
    );
}