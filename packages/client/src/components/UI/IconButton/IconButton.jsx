import React from 'react';
import style from './IconButton.module.less';

/**
 * Icon button component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {ReactComponent} props.children Inner icon
 * @param {string} props.modifier CSS BEM modifier
 * @param {function(): void} props.onClick Icon button onClick event handler
 * @returns {JSX.Element} Icon button element
 * @example
 * import { ReactComponent as Icon } from './assets/svg/icon.svg';
 * return (
 *   <IconButton
 *     className='Item__iconbutton'
 *     onClick={handleClick}
 *   >
 *     <Icon />
 *   </IconButton>
 * )
 */
function IconButton({ className, children, modifier, onClick }) {
  return (
    <button
      className={[
        className ? `${style.IconButton} ${className}` : style.IconButton,
        modifier ? ` ${style[`IconButton--${modifier}`]}` : '',
      ].join('')}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default IconButton;
