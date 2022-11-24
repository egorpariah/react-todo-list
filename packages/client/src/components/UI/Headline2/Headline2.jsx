import React from 'react';
import style from './Headline2.module.less';

/**
 * H2 component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.children Inner text
 * @returns {JSX.Element} H2 element
 * @example
 * const text = 'Title';
 * return (
 *   <Headline2 className='Page__headline2'>{text}</Headline2>
 * )
 */
function Headline2({ className, children }) {
  return (
    <h3
      className={
        className ? `${style.Headline2} ${className}` : style.Headline2
      }
    >
      {children}
    </h3>
  );
}

export default Headline2;
