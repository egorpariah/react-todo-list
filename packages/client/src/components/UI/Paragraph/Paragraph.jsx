import React from 'react';
import style from './Paragraph.module.less';

export default function Paragraph({ className, children }) {
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
