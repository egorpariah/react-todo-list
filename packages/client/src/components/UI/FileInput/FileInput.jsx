import React from 'react';
import style from './FileInput.module.less';
import { ReactComponent as Cross } from '../../../assets/svg/cross.svg';

/**
 * File input component
 * @param {Object} props Component props
 * @param {string} [props.className] External CSS classes
 * @param {FileList} props.newFiles Files for upload
 * @param {function(React.MouseEvent): void} props.clearFileInput Clears file list in input
 * @param {function(React.ChangeEvent): void} props.onChange File input onChange event handler
 * @returns {JSX.Element} File input component
 * @example
 * const [newFiles, setNewFIles] = useState([]);
 * return (
 *   <FileInput
 *     newFiles={newFiles}
 *     className='Form__files'
 *     onChange={handleFilesChange}
 *     clearFileInput={clearFileInput}
 *   />
 * )
 */
function FileInput({ className, newFiles, clearFileInput, onChange }) {
  return (
    <label
      className={
        className
          ? `${style.FileInput} ${className} ${
              !newFiles.length && style['FileInput--empty']
            }`
          : style.FileInput
      }
    >
      {newFiles.length ? (
        <Cross
          className={style.FileInput__icon}
          onClick={e => clearFileInput(e)}
        />
      ) : (
        ''
      )}
      <span className={style.FileInput__text}>
        {newFiles.length
          ? Object.values(newFiles)
              .map(newFile => newFile.name)
              .join(', ')
          : 'Attach files'}
      </span>
      <input
        className={style.FileInput__input}
        type='file'
        files={newFiles}
        multiple
        onChange={e => onChange(e)}
      />
    </label>
  );
}

export default FileInput;
