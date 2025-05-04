import { useState, useEffect } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import { IoEllipse } from 'react-icons/io5';
import PropTypes from 'prop-types';
import ReviewerPic from '../../assets/img/ReviewPic.png';
import Star from '../../assets/img/Star.png';
import Book from '../../assets/img/Book.png';
import css from '../Teacher/Teacher.module.css';

export default function Teacher({ teacher }) {
  useEffect(() => {
    document.body.style.backgroundColor = '#eee';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const [expanded, setExpanded] = useState(false);

  const [favorites, setFavorites] = useState(() => {
    // Инициализация состояния из localStorage
    // console.log(teacher);

    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = teacher => {
    const updatedFavorites = favorites.includes(teacher.id)
      ? favorites.filter(favId => favId !== teacher.id)
      : [...favorites, teacher.id];

    setFavorites(updatedFavorites);
  };

  // console.log(teacher);

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
          onClick={() => toggleFavorite(teacher.id)}
        >
          {favorites.includes(teacher) ? (
            <IoHeartOutline className={css.heartFavorite} />
          ) : (
            <IoHeartSharp className={css.heartNoFavorite} />
          )}
        </button>
      </div>
      <h2 className={css.nameTitle}>
        {teacher.name} {teacher.surname}
      </h2>
      <ul className={css.infoList}>
        <li className={css.infoListItem}>
          <span className={css.infoListItemSpan}>Speaks:</span>&nbsp;
          {teacher.languages.join(',')}
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
          <li key={i} className={css.levelsListItem}>
            {l}
          </li>
        ))}
      </ul>
      {expanded && <button className={css.bookBtn}>Book trial lesson</button>}
    </div>
  );
}

Teacher.propTypes = {
  teacher: PropTypes.object.isRequired,
};
