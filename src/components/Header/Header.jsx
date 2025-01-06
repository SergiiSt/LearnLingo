import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import css from '../Header/Header.module.css';
import LearnLingoLogo from '../../assets/img/LearnLingoLogo.jpg';
import { MdLogin } from 'react-icons/md';
import RegistrationModal from '../LoginModal/LoginModal';

export default function Header() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    document.body.classList.add('modal-open');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    setModalIsOpen(false);
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
              <button className={css.logBtn} onClick={openModal}>
                <MdLogin className={css.icon} />
                Log in
              </button>
            </li>
            <li>
              <button className={css.regBtn}>Registration</button>
            </li>
          </ul>
        </nav>
      </div>
      <RegistrationModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
    </header>
  );
}
