import React from 'react';
import style from './Paragraph.module.less';

/**
 * Paragraph component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.children Inner text
 * @returns {JSX.Element} Paragraph element
 * @example
 * return (
 *   <p className='Item__description'>Item 01</p>
 * )
 */
function Paragraph({ className, children }) {
  return (
    <p
      className={
        className ? `${style.Paragraph} ${className}` : style.Paragraph
      }
    >
      {children}
    </p>
  );
}

export default Paragraph;
