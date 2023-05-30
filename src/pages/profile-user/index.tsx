import { useEffect, useState, FormEvent } from 'react';

import {
    Input
    , PasswordInput
    , EmailInput
    , Button
} from '@ya.praktikum/react-developer-burger-ui-components';

// shared
import { useProvideAuth } from '../../services/auth';
import { TUserProfileFormData } from '../../shared/types/auth-types';

// styles
import styles from '../pages.module.css';

export const ProfileUserPage = () => {

    const { user, request, failed, message, getUserProfile, patchUserProfile } = useProvideAuth();
    const [formData, setFormData] = useState<TUserProfileFormData>({
        name: ''
        , email: ''
        , password: ''
    });

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        if (user && !request && !failed) {
            const u = { ...user, password: '' };
            setFormData(u);
        }
    }, [user, request, failed])

    const errorMessage = (
        <span className={`text text_type_main-default ${styles.errorText}`}>
            Возникла ошибка: {message}
        </span>
    );

    function formSubmit(e: FormEvent<HTMLFormElement>): boolean {
        e.preventDefault();
        patchUserProfile(formData);
        return false;
    }

    function disabledButton() {
        return !formData || !formData.email || formData.email.length === 0
            || !formData.name || formData.name.length === 0
            || !formData.password || formData.password.length === 0
    }

    return (
        <div className={styles.wrapper}>
            {request && <div className='text text_type_main-medium'>Загрузка профиля. Ждите...</div>}
            {!request &&
                <>
                    <form className={styles.formColumn} onSubmit={formSubmit}>
                        <Input type={'text'}
                            value={formData.name}
                            placeholder={'Имя'}
                            required
                            onChange={e => { setFormData({ ...formData, name: e.target.value }); }}
                            extraClass="mb-4"
                        />
                        <EmailInput required
                            extraClass="mb-4"
                            value={formData.email}
                            placeholder={'Логин'}
                            onChange={e => { setFormData({ ...formData, email: e.target.value }); }}
                        />
                        <PasswordInput required
                            extraClass="mb-4"
                            value={formData.password}
                            placeholder={'Пароль'}
                            onChange={e => { setFormData({ ...formData, password: e.target.value }); }}
                        />
                        <div className={styles.buttonsWrapper}>
                            <Button htmlType="submit"
                                disabled={disabledButton()}
                                type="primary"
                                size="medium">
                                Сохранить
                            </Button>
                            &nbsp;
                            <Button htmlType="button"
                                type="primary"
                                disabled={disabledButton()}
                                size="medium"
                                onClick={() => user && setFormData({ ...formData, email: user.email, name: user.name })}>
                                Отмена
                            </Button>
                        </div>

                    </form>
                    {failed && errorMessage}
                </>
            }
        </div>
    );
}