/* eslint-disable react/prop-types */
import {useState} from 'react';
import {ThumbsUp, Trash} from 'phosphor-react';
import styles from './Comment.module.css';
import {Avatar} from './Avatar';

export function Comment({ content, onDeleteComment }) {
  const [likeCount, setLikeCount] = useState(0);

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://github.com/diego3g.png" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Felipe Monteiro</strong>
              <time title="19 de agosto às 03:15h" dateTime="2024-08-19 03:15:45">Cerca de 1h atrás</time>
            </div>

            <button onClick={() => onDeleteComment(content)} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>

        <footer>
          <button onClick={() => setLikeCount(likeCount + 1)}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
          
        </footer>
      </div>
    </div>
  );
}