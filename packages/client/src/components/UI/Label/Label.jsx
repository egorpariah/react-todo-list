import React from 'react';
import style from './Label.module.less';

/**
 * Text label component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {string} props.children Inner text
 * @returns {JSX.Element} Text label element
 * @example
 * const datetime = 'Thursday, 21 Nov 2022 14:26';
 * return (
 *   <Label className='Item__datetime'>{datetime}</Label>
 * )
 */
function Label({ className, children }) {
  return (
    <div className={className ? `${style.Label} ${className}` : style.Label}>
      {children}
    </div>
  );
}

export default Label;
