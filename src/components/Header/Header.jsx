import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import css from '../Header/Header.module.css';
import LearnLingoLogo from '../../assets/img/LearnLingoLogo.jpg';
import { MdLogin } from 'react-icons/md';
import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';

export default function Header() {
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // Хранит тип модального окна (login или register)

  const openLoginModal = () => {
    document.body.classList.add('modal-open');
    setModalType('login');
  };

  const openRegistrationModal = () => {
    document.body.classList.add('modal-open');
    setModalType('register');
  };
  const closeModal = () => {
    document.body.classList.remove('modal-open');
    // setModalIsOpen(false);
    setModalType(null);
  };

  return (
    <header className={css.header}>
      <div className={`${css.headerWrap} container`}>
        <section>
          <NavLink to="/" className={css.headerLink}>
            <img src={LearnLingoLogo} alt="LearnLingo logo" />
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
              <button className={css.logBtn} onClick={openLoginModal}>
                <MdLogin className={css.icon} />
                Log in
              </button>
            </li>
            <li>
              <button className={css.regBtn} onClick={openRegistrationModal}>
                Registration
              </button>
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
