import { useState } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import { IoEllipse } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import BookingModal from '../BookingModal/BookingModal';
import PropTypes from 'prop-types';
import ReviewerPic from '../../assets/img/ReviewPic.png';
import Star from '../../assets/img/Star.png';
import Book from '../../assets/img/Book.png';
import toast from 'react-hot-toast';
import css from '../Teacher/Teacher.module.css';

export default function Teacher({ teacher, isFavorite, toggle, level }) {
  const user = useSelector(state => state.auth.user);

  const [expanded, setExpanded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    document.body.classList.add('modal-open');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    setModalIsOpen(false);
  };

  const pushLogIn = () => {
    toast('You must be logged in to book your trial lesson.');
  };

  let selectedLevel = level;

  return (
    <div className={css.cardWrap}>
      <aside className={css.imgWrap}>
        <img src={teacher.avatar_url} className={css.ava} alt="Teacher Photo" />
        <div className={css.ellipseWrap}>
          <IoEllipse className={css.ellipse} />
        </div>
      </aside>
      <div className={css.listWrap}>
        <p className={css.languages}>Languages</p>
        <ul className={css.teacherList}>
          <li className={css.teacherListItem}>
            <img src={Book} alt="book" className={css.book} />
            Lessons online
          </li>
          <li className={css.teacherListItem}>
            Lessons done: {teacher.lessons_done}
          </li>
          <li className={css.teacherListItem}>
            <img src={Star} alt="star" className={css.star} />
            Rating: {teacher.rating}
          </li>
          <li className={css.teacherListItem}>
            Price / 1 hour:&nbsp;
            <span className={css.price}>{teacher.price_per_hour}$</span>
          </li>
        </ul>
        <button
          type="button"
          className={css.heartBtn}
          onClick={toggle}
          title={!user ? 'Log in to add to favorites' : 'Add to favorites'}
        >
          {!user ? (
            <IoHeartOutline className={css.heartFavorite} />
          ) : isFavorite ? (
            <IoHeartSharp className={css.heartNoFavorite} />
          ) : (
            <IoHeartOutline className={css.heartFavorite} />
          )}
        </button>
      </div>
      <h2 className={css.nameTitle}>
        {teacher.name} {teacher.surname}
      </h2>
      <ul className={css.infoList}>
        <li className={css.infoListItem}>
          <span className={css.infoListItemSpan}>Speaks:</span>&nbsp;
          <span className={css.infoListItemSpanLang}>
            {teacher.languages.join(', ')}
          </span>
        </li>
        <li className={css.infoListItem}>
          <span className={css.infoListItemSpan}>Lesson Info:</span>&nbsp;
          {teacher.lesson_info}
        </li>
        <li className={css.infoListItem}>
          <span className={css.infoListItemSpan}>Conditions:</span>&nbsp;
          {teacher.conditions}
        </li>
        {!expanded && (
          <li className={css.infoListItem}>
            <button
              className={css.readMoreBtn}
              onClick={() => setExpanded(true)}
            >
              Read more
            </button>
          </li>
        )}
      </ul>
      {expanded && (
        <>
          <p className={css.experience}>{teacher.experience}</p>
          {teacher.reviews?.length > 0 ? (
            <ul className={css.reviewsList}>
              {teacher.reviews.map((r, i) => (
                <li key={i} className={css.reviewsListItem}>
                  <div className={css.reviewerAvaWrap}>
                    <img
                      src={ReviewerPic}
                      alt="reviewer avatar"
                      className={css.reviewerPic}
                    />
                  </div>
                  <span className={css.reviewerNameSpan}>
                    {r.reviewer_name}
                  </span>
                  <span className={css.reviewerRatingSpan}>
                    <img src={Star} alt="star" className={css.star} />
                    {r.reviewer_rating}.0
                  </span>
                  <p className={css.comment}>{r.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No data yet</p>
          )}
        </>
      )}
      <ul className={css.levelsList}>
        {teacher.levels.map((l, i) => (
          <li
            key={i}
            className={`${css.levelsListItem} ${
              selectedLevel === l ? css.active : ''
            }`}
          >
            {l}
          </li>
        ))}
      </ul>

      {expanded && (
        <button className={css.bookBtn} onClick={!user ? pushLogIn : openModal}>
          Book trial lesson
        </button>
      )}
      <BookingModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        teacher={teacher}
      />
    </div>
  );
}

Teacher.propTypes = {
  teacher: PropTypes.object.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
};
