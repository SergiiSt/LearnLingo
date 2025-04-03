import { useState, useEffect } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';
import { IoEllipse } from 'react-icons/io5';
import PropTypes from 'prop-types';
import css from '../Teacher/Teacher.module.css';

export default function Teacher({ teacher }) {
  useEffect(() => {
    document.body.style.backgroundColor = '#eee';

    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const [favorites, setFavorites] = useState(() => {
    // Инициализация состояния из localStorage
    console.log(teacher);

    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  const toggleFavorite = teacher => {
    // Используем ID для проверки избранного
    const updatedFavorites = favorites.includes(teacher.id)
      ? favorites.filter(favId => favId !== teacher.id) // Удаляем из избранного
      : [...favorites, teacher.id]; // Добавляем в избранное
    // console.log(teacher.id);

    setFavorites(updatedFavorites);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className={css.cardWrap}>
      <aside className={css.imgWrap}>
        <img
          src={teacher.avatar_url}
          className={css.ava}
          alt="Teacher Photo"
          // width="96px"
        />
        <div className={css.ellipseWrap}>
          <IoEllipse className={css.ellipse} />
        </div>
      </aside>
      <div className={css.listWrap}>
        <p className={css.languages}>Languages</p>
        <ul className={css.teacherList}>
          <li>Lessons online</li>
          <li>Lessons done: {teacher.lessons_done}</li>
          <li>Rating: {teacher.rating}</li>
          <li>Price / 1 hour: {teacher.price_per_hour}$</li>
        </ul>
        <button
          type="button"
          // className={css.heartBtn}
          onClick={() => toggleFavorite(teacher)}
        >
          {favorites.includes(teacher) ? <IoHeartSharp /> : <IoHeartOutline />}
        </button>
      </div>

      <h2>
        {teacher.name} {teacher.surname}
      </h2>
    </div>
  );
}

Teacher.propTypes = {
  teacher: PropTypes.object.isRequired,
};
