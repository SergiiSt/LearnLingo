import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Для валидации
import { IoCloseOutline } from 'react-icons/io5';
import { LuEyeOff, LuEye } from 'react-icons/lu';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
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
  const [showPassword, setShowPassword] = useState(false); // Для отображения пароля
  const dispatch = useDispatch();

  const handleModalClose = () => {
    closeModal();
  };

  const handleSignUp = async (values, actions) => {
    const { email, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
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
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <div>
      s
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        className={css.logModal}
        style={customStyles}
        // onClick={e => {
        //   if (e.target === e.currentTarget) handleModalClose();
        // }}
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
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignUp}
        >
          {({ isSubmitting }) => (
            <Form>
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
              <button
                type="submit"
                className={css.modalBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Log In'}
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
