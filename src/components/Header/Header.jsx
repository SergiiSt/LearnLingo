import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import css from '../Header/Header.module.css';
import LearnLingoLogo from '../../assets/img/LearnLingoLogo.jpg';
import { MdLogin } from 'react-icons/md';
import LoginModal from '../LoginModal/LoginModal';
import RegistrationModal from '../RegistrationModal/RegistrationModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/slice';
import { db } from '../../../firebase';
import { ref, child, get } from 'firebase/database';

// import { object } from 'yup';

export default function Header() {
  const dispatch = useDispatch();
  const auth = getAuth();

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const openLoginModal = () => {
    document.body.classList.add('modal-open');
    setModalType('login');
  };

  const userUid = useSelector(state => state.auth.uid);
  const loggedIn = useSelector(state => state.auth.isLoggedIn);
  // console.log(loggedIn);

  const openRegistrationModal = () => {
    document.body.classList.add('modal-open');
    setModalType('register');
  };

  useEffect(() => {
    const getUserName = async () => {
      const dbRef = ref(db);
      try {
        const snapshot = await get(child(dbRef, `users/${userUid}`));
        if (snapshot.exists()) {
          const user = snapshot.val();

          setUsername(user.username);
          setRole(user.role);
        } else {
          console.log('No data');
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserName();
  }, [userUid]);
  const closeModal = () => {
    document.body.classList.remove('modal-open');
    // setModalIsOpen(false);
    setModalType(null);
  };

  // console.log(username);
  // console.log(role);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(logout());
        setRole('');
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
        <section className={css.geaderLogoWrap}>
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
            <li className={css.first}>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/teachers">Teachers</NavLink>
            </li>
            {role === 'God' ? (
              <li>
                <NavLink to="/admin">Admin</NavLink>
              </li>
            ) : null}
          </ul>
          <ul className={css.headerList}>
            <li className={css.second}>
              {!loggedIn ? (
                <button className={css.logBtn} onClick={openLoginModal}>
                  <MdLogin className={css.icon} />
                  Log in
                </button>
              ) : (
                <div className={css.loggedinName}>
                  <span className={css.greetingWrap}>Welcome {role}</span>
                  {username}
                </div>
              )}
            </li>
            <li>
              {!loggedIn ? (
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
