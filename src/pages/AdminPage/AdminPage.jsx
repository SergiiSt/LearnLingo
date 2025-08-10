import { NavLink, Outlet } from 'react-router';
// import UsersList from '../../components/UsersList/UsersList';
import css from './AdminPage.module.css';

export default function AdminPage() {
  return (
    <div>
      <NavLink to={`/admin/users`} className={css.usersLink}>
        Users
      </NavLink>
      <Outlet />
    </div>
  );
}
