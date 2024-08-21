import {useState, FormEvent, ChangeEvent} from 'react';
import {Avatar} from './Avatar';
import {Comment} from './Comment';
import styles from './Post.module.css';
import {format, formatDistanceToNow} from 'date-fns';
import {ptBR} from 'date-fns/locale';

interface Author {
  name: string;
  avatarUrl: string;
  role: string;
};

interface Content {
  type: 'paragraph' | 'link' | string;
  content: string;
};

export interface PostType {
  id: number;
  author: Author;
  content: Content[];
  publishedAt: Date;
}

interface PostProps {
  post: PostType;
};

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(['Post Bacana!']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormated = format(post.publishedAt, "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'", { locale: ptBR });

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, { locale: ptBR, addSuffix: true });

  function handleCreateNewComment(e: FormEvent) {
    e.preventDefault();
    
    setComments([...comments, newCommentText]);
    setNewCommentText('');
  };

  function handleDeleteComment(commentToDelete: string) {
    setComments(comments.filter(comment => comment !== commentToDelete));
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={post.author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong>
            <span>{post.author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {post.content.map((item) => {
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
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            e.target.setCustomValidity('')
            setNewCommentText(e.target.value)
          }}
          placeholder='Deixe um comentário'
          required
          onInvalid={(e: ChangeEvent<HTMLTextAreaElement>) => e.target.setCustomValidity('Esse campo é obrigatório!')}
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
