import css from '../MainStats/MainStats.module.css';
export default function MainStats() {
  return (
    <section className={css.mainStats}>
      <ul className={css.statsList}>
        <li className={css.listItem}>
          32,000 +<span className={css.listSpan}>Experienced tutors</span>
        </li>
        <li className={css.listItem}>
          300,000 +<span className={css.listSpan}>5-star tutor reviews</span>
        </li>
        <li className={css.listItem}>
          120 +<span className={css.listSpan}>Subjects taught</span>
        </li>
        <li className={css.listItem}>
          200 +<span className={css.listSpan}>Tutor nationalities</span>
        </li>
      </ul>
    </section>
  );
}
