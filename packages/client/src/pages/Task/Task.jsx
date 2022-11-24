import React from 'react';
import Container from '../../components/UI/Container/Container';
import { ReactComponent as Back } from '../../assets/svg/back.svg';
import style from './Task.module.less';
import Headline1 from '../../components/UI/Headline1/Headline1';
import Label from '../../components/UI/Label/Label';
import Paragraph from '../../components/UI/Paragraph/Paragraph';
import File from '../../components/UI/File/File';
import FilesList from '../../components/FilesList/FilesList';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function Task() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { task } = state;

  return (
    <Container>
      <div className={style.Task}>
        <Back
          className={style.Task__back}
          onClick={() => {
            navigate(-1);
          }}
        />
        <Label className={style.Task__date}>
          {dayjs.utc(task.expire).local().format('dddd, D MMM YYYY HH:mm')}
        </Label>
        <Headline1 className={style.Task__headline}>{task.name}</Headline1>
        <Paragraph className={style.Task__description}>
          {task.description}
        </Paragraph>
        {task.files.length > 0 && (
          <Label className={style.Task__files}>Files attached:</Label>
        )}
        <FilesList>
          {task.files.map((file, i) => (
            <File
              taskId={task.id}
              className={style.Task__file}
              key={i}
            >
              {file}
            </File>
          ))}
        </FilesList>
      </div>
    </Container>
  );
}
