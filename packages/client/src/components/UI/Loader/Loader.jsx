import React from 'react';
import style from './Loader.module.less';

/**
 * Loader component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @returns {JSX.Element} Loader element
 * @example
 * return (
 *   <Loader className='List__loader'/>
 * )
 */
function Loader({ className }) {
  return (
    <div className={className ? `${style.Loader} ${className}` : style.Loader}>
      <div className={style['lds-ellipsis']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default Loader;
