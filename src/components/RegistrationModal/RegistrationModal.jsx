import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IoCloseOutline } from 'react-icons/io5';
import { LuEyeOff, LuEye } from 'react-icons/lu';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { ref, set } from 'firebase/database';
import toast from 'react-hot-toast';
import css from '../RegistrationModal/RegistrationModal.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/slice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export default function RegistrationModal({ modalIsOpen, closeModal }) {
  const [showPassword, setShowPassword] = useState(false);
  // const [checkPassword, setCheckPassword] = useState('');
  // const [checkPasswordRep, setCheckPasswordRep] = useState('');

  const dispatch = useDispatch();

  const handleModalClose = () => {
    closeModal();
  };

  const handleSignUp = async (values, actions) => {
    const { username, email, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await set(ref(db, `users/${user.uid}`), {
        username,
        email,
        createdAt: new Date().toISOString(),
      });
      toast.success('You signed in sucsessfuly');
      dispatch(login({ user }));
      actions.resetForm();
      handleModalClose();
    } catch (error) {
      toast.error(`Error signing in ${error.message}`);
      actions.setFieldError('email', 'Invalid email or password');
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, 'Must be at least 3 characters')
      .max(12, 'Must be 12 characters or less')
      .required('Userneme is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().min(8).required('Password is required'),
    passwordRep: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        className={css.logModal}
        style={customStyles}
      >
        <h2 className={css.modalTitle}>Registration</h2>
        <button type="button" onClick={handleModalClose} className={css.clsBtn}>
          <IoCloseOutline />
        </button>
        <p className={css.modalText}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            passwordRep: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form>
              <label>
                <Field
                  type="text"
                  name="username"
                  placeholder="Username"
                  className={`${css.input} ${css.firstClass}`}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={css.error}
                />
              </label>
              <label>
                <Field
                  type="email"
                  name="email"
                  className={`${css.input} ${css.firstClass}`}
                  placeholder="Email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />
              </label>
              <label className={css.passwordWrapper}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`${css.input} ${css.secondClass}`}
                  placeholder="Password"
                  // onInput={e => setCheckPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className={css.eyeBtn}
                >
                  {showPassword ? (
                    <LuEye className={css.eyeOpen} />
                  ) : (
                    <LuEyeOff className={css.eyeClosed} />
                  )}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </label>
              <label className={css.passwordRepWrapper}>
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="passwordRep"
                  className={`${css.input} ${css.secondClass}`}
                  placeholder="Password"
                  // onInput={e => setCheckPasswordRep(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => !prev)}
                  className={css.eyeBtnRep}
                >
                  {showPassword ? (
                    <LuEye className={css.eyeOpen} />
                  ) : (
                    <LuEyeOff className={css.eyeClosed} />
                  )}
                </button>
                <ErrorMessage
                  name="passwordRep"
                  component="div"
                  className={css.error}
                />
              </label>
              <button
                type="submit"
                className={css.modalBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
}

RegistrationModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};
