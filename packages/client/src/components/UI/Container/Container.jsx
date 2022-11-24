import React from 'react';
import style from './Container.module.less';

/**
 * Layout container component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {*} props.children Inner elements
 * @returns {JSX.Element} Container element
 * @example
 * return (
 *   <Container className='Page__container'>
 *     <div>Content</div>
 *   </Container>
 * )
 */
function Container({ className, children }) {
  return (
    <div
      className={
        className ? `${style.Container} ${className}` : style.Container
      }
    >
      {children}
    </div>
  );
}

export default Container;
