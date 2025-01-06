import React, { useState } from 'react';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Для валидации
import { IoCloseOutline } from 'react-icons/io5';
import { LuEyeOff, LuEye } from 'react-icons/lu';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';
import toast, { Toaster } from 'react-hot-toast';

import css from './LoginModal.module.css';

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

export default function LoginModal({ modalIsOpen, closeModal }) {
  const [showPassword, setShowPassword] = useState(false); // Для отображения пароля

  const handleModalClose = () => {
    closeModal();
  };

  const handleSignIn = async (values, actions) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('You signedin sucsessfuly');

      actions.resetForm();
      handleModalClose();
    } catch (error) {
      toast.error('Error signing in');
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
      <Toaster />;
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        className={css.logModal}
        style={customStyles}
        onClick={e => {
          if (e.target === e.currentTarget) handleModalClose();
        }}
      >
        <h2 className={css.modalTitle}>Log In</h2>
        <button type="button" onClick={handleModalClose} className={css.clsBtn}>
          <IoCloseOutline />
        </button>
        <p className={css.modalText}>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a teacher.
        </p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSignIn}
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