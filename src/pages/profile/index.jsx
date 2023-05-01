import { Outlet } from 'react-router-dom';

// components
import { ProfileMenu } from '../../components';

// styles
import styles from './profile.module.css';

export const ProfilePage = () => (
    <div className={styles.wrapper}>
        <div className={styles.sideColumn}>
            <ProfileMenu />
        </div>
        <div className={styles.centerColumn}>
            <Outlet />
        </div>
        <div className={styles.sideColumn}>
        </div>
    </div>
);