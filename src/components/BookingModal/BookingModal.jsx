import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

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
  const handleModalClose = () => {
    closeModal();
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

  // console.log(teacher);

  return (
    <div>
      <Modal
        className={css.bookmodal}
        isOpen={modalIsOpen}
        style={customStyles}
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
              <input type="radio" id="career" name="reason" value="career" />
              <label htmlFor="career">Career and business</label>
            </div>
            <div className={css.inputWrap}>
              <input type="radio" id="kids" name="reason" value="kids" />
              <label htmlFor="kids">Lesson for kids</label>
            </div>
            <div className={css.inputWrap}>
              <input type="radio" id="abroad" name="reason" value="abroad" />
              <label htmlFor="abroad">Living abroad</label>
            </div>
            <div className={css.inputWrap}>
              <input type="radio" id="exams" name="reason" value="exams" />
              <label htmlFor="exams">Exams and coursework</label>
            </div>
            <div className={css.inputWrap}>
              <input type="radio" id="travel" name="reason" value="travel" />
              <label htmlFor="travel">Culture, travel or hobby</label>
            </div>
          </fieldset>
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className={css.nameInput}
            />
            <input type="text" placeholder="Email" className={css.nameInput} />
            <input
              type="text"
              placeholder="Phone number"
              className={css.nameInput}
            />
          </div>
          <button className={css.bookBtn}>Book</button>
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
