import { Outlet } from "react-router-dom";

import styles from './layout.module.scss';


export const Layout = () => {
  return (
    <div className={styles.container + ' mt-15 pt-30 '}>1111
      <Outlet />
    </div>
  );
};