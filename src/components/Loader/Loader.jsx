import { Audio } from 'react-loader-spinner';

import css from '../Loader/Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <Audio
        height="150"
        width="150"
        radius="9"
        color="green"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
}
