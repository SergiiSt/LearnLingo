import { NavLink } from 'react-router-dom';
import css from '../MainInfo/MainInfo.module.css';
export default function MainInfo() {
  return (
    <section className={css.heroInfo}>
      <h1 className={css.heroTitle}>
        Unlock your potential with the best{' '}
        <span className={css.heroSpan}>language</span> tutors
      </h1>
      <p className={css.heroText}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <NavLink to="/teachers" className={css.headerLink}>
        Get started
      </NavLink>
    </section>
  );
}
