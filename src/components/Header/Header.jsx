import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import css from '../Header/Header.module.css';
import LearnLingoLogo from '../../assets/img/LearnLingoLogo.jpg';
import { MdLogin } from 'react-icons/md';
import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/slice';

export default function Header() {
  const dispatch = useDispatch();
  const auth = getAuth();

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openLoginModal = () => {
    document.body.classList.add('modal-open');
    setModalType('login');
  };

  const user = useSelector(state => state.auth.user);

  const openRegistrationModal = () => {
    document.body.classList.add('modal-open');
    setModalType('register');
  };
  const closeModal = () => {
    document.body.classList.remove('modal-open');
    // setModalIsOpen(false);
    setModalType(null);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
      })
      .catch(error => {
        console.log(error);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <header className={css.header}>
      <div className={`${css.headerWrap} container`}>
        <section>
          <NavLink to="/" className={css.headerLink}>
            <img
              src={LearnLingoLogo}
              alt="LearnLingo logo"
              className={css.headerLogo}
            />
            <span className={css.headerTitle}>LearnLingo</span>
          </NavLink>
        </section>
        <nav className={css.nav}>
          <ul className={css.headerList}>
            <NavLink to="/" className={css.first}>
              Home
            </NavLink>
            <NavLink to="/teachers">Teachers</NavLink>
          </ul>
          <ul className={css.headerList}>
            <li className={css.second}>
              {!user ? (
                <button className={css.logBtn} onClick={openLoginModal}>
                  <MdLogin className={css.icon} />
                  Log in
                </button>
              ) : (
                <div className={css.loggedinName}>{user.email}</div>
              )}
            </li>
            <li>
              {!user ? (
                <button className={css.regBtn} onClick={openRegistrationModal}>
                  Registration
                </button>
              ) : (
                <button className={css.regBtn} onClick={handleLogout}>
                  Log out
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
      {modalType === 'login' && (
        <LoginModal modalIsOpen={true} closeModal={closeModal} />
      )}
      {modalType === 'register' && (
        <RegistrationModal modalIsOpen={true} closeModal={closeModal} />
      )}
    </header>
  );
}
