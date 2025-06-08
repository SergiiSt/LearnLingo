import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../../../firebase';
import toast from 'react-hot-toast';

import { RxCross2 } from 'react-icons/rx';

import css from '../BookingModal/BookingModal.module.css';

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

export default function BookingModal({ modalIsOpen, closeModal, teacher }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');

  const handleModalClose = () => {
    closeModal();
  };

  const handleBook = async () => {
    const bookingData = {
      fullName,
      email,
      phone,
      reason,
      teacherId: `${teacher.name} ${teacher.surname}, Teacher id: ${teacher.id}`,
      createdAt: new Date().toISOString(),
    };
    try {
      await push(ref(db, 'bookings'), bookingData);
      toast('Lesson booked successfully!');
      closeModal();
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.classList.add('modal-open');
      document.documentElement.classList.add('modal-open'); // <== вот это важно
    } else {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    }

    return () => {
      document.body.classList.remove('modal-open');
      document.documentElement.classList.remove('modal-open');
    };
  }, [modalIsOpen]);

  return (
    <div>
      <Modal
        className={css.bookmodal}
        isOpen={modalIsOpen}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          content: customStyles.content,
        }}
        onRequestClose={handleModalClose}
      >
        <div>
          <button className={css.closeBtn} onClick={handleModalClose}>
            <RxCross2 />
          </button>
          <h2 className={css.modalTitle}>Book trial lesson</h2>
          <p className={css.modalParagraph}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>
          <div className={css.teacherWrap}>
            <h3 className={css.modalTeacher}>Your teacher</h3>
            <img
              src={teacher.avatar_url}
              alt="Your teacher foto"
              className={css.teacherPhoto}
            />
            <p className={css.teacherName}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
          <fieldset className={css.modalRadio}>
            <legend className={css.legend}>
              What is your main reason for learning English?
            </legend>
            <div className={css.inputWrap}>
              <input
                type="radio"
                id="career"
                name="reason"
                value="career"
                onChange={e => setReason(e.target.value)}
              />
              <label htmlFor="career">Career and business</label>
            </div>
            <div className={css.inputWrap}>
              <input
                type="radio"
                id="kids"
                name="reason"
                value="kids"
                onChange={e => setReason(e.target.value)}
              />
              <label htmlFor="kids">Lesson for kids</label>
            </div>
            <div className={css.inputWrap}>
              <input
                type="radio"
                id="abroad"
                name="reason"
                value="abroad"
                onChange={e => setReason(e.target.value)}
              />
              <label htmlFor="abroad">Living abroad</label>
            </div>
            <div className={css.inputWrap}>
              <input
                type="radio"
                id="exams"
                name="reason"
                value="exams"
                onChange={e => setReason(e.target.value)}
              />
              <label htmlFor="exams">Exams and coursework</label>
            </div>
            <div className={css.inputWrap}>
              <input
                type="radio"
                id="travel"
                name="reason"
                value="travel"
                onChange={e => setReason(e.target.value)}
              />
              <label htmlFor="travel">Culture, travel or hobby</label>
            </div>
          </fieldset>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className={css.nameInput}
              onChange={e => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className={css.nameInput}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone number"
              className={css.nameInput}
              onChange={e => setPhone(e.target.value)}
            />
          </div>
          <button className={css.bookBtn} onClick={handleBook}>
            Book
          </button>
        </div>
      </Modal>
    </div>
  );
}

BookingModal.propTypes = {
  modalIsOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired,
};
