import React from 'react';
import style from './Headline3.module.less';

/**
 * H3 component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.children Inner text
 * @returns {JSX.Element} H3 element
 * @example
 * const text = 'Title';
 * return (
 *   <Headline3 className='Page__headline3'>{text}</Headline3>
 * )
 */
function Headline3({ className, children, ...props }) {
  return (
    <h3
      className={
        className ? `${style.Headline3} ${className}` : style.Headline3
      }
      {...props}
    >
      {children}
    </h3>
  );
}

export default Headline3;
