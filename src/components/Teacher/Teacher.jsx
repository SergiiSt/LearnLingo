import { useState, useEffect } from 'react';
import { IoHeartOutline } from 'react-icons/io5';
import { IoHeartSharp } from 'react-icons/io5';

export default function Teacher(teacher) {
  const [favorites, setFavorites] = useState(() => {
    // Инициализация состояния из localStorage
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
    console.log(teacher.id);

    setFavorites(updatedFavorites);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <aside>
        <img src="" alt="" />
      </aside>
      <p>Languages</p>
      <h2>{teacher.name} Smith</h2>
      <ul>
        <li>Lessons online</li>
        <li>Lessons done: 1098</li>
        <li>Rating: 4.8</li>
        <li>Price / 1 hour: 30$</li>
      </ul>
      <button
        type="button"
        // className={css.heartBtn}
        onClick={() => toggleFavorite(teacher)}
      >
        {favorites.includes(teacher.id) ? <IoHeartSharp /> : <IoHeartOutline />}
      </button>
    </div>
  );
}
