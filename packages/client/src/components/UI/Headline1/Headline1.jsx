import React from 'react';
import style from './Headline1.module.less';

/**
 * H1 component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.children Inner text
 * @returns {JSX.Element} H1 element
 * @example
 * const text = 'Page Title';
 * return (
 *   <Headline1 className='Page__headline1'>{text}</Headline1>
 * )
 */
function Headline1({ children, className }) {
  return (
    <h1
      className={
        className ? `${style.Headline1} ${className}` : style.Headline1
      }
    >
      {children}
    </h1>
  );
}

export default Headline1;
