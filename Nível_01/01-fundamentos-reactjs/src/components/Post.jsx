/* eslint-disable react/prop-types */
import {useState} from 'react';
import {Avatar} from './Avatar';
import {Comment} from './Comment';
import styles from './Post.module.css';
import {format, formatDistanceToNow} from 'date-fns';
import {ptBR} from 'date-fns/locale';

export function Post({ author, content, publishedAt }) {
  const [comments, setComments] = useState(['Post Bacana!']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'", { locale: ptBR });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, { locale: ptBR, addSuffix: true });

  function handleCreateNewComment(e) {
    e.preventDefault();
    
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  };

  function handleDeleteComment(commentToDelete) {
    setComments(comments.filter(comment => comment !== commentToDelete));
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map((item) => {
          if (item.type === 'paragraph') {
            return <p key={item.content}>{item.content}</p>;
          } else if (item.type === 'link') {
            return <p key={item.content} ><a href="#" target="_blank" rel="noreferrer">{item.content}</a></p>;
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          value={newCommentText}
          onChange={e => {
            e.target.setCustomValidity('')
            setNewCommentText(e.target.value)
          }}
          placeholder='Deixe um comentário'
          required
          onInvalid={e => e.target.setCustomValidity('Esse campo é obrigatório!')}
        />

        <footer>
          <button disabled={!newCommentText} type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => (
          <Comment 
            key={comment} 
            content={comment} 
            onDeleteComment={handleDeleteComment} 
          />
        ))}
      </div>
    </article>
  );
}
