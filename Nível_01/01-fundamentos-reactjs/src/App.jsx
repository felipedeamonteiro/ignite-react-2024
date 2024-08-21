import {Header} from './components/Header';
import { Post } from './components/Post';
import './global.css';
import styles from './App.module.css';
import {Sidebar} from './components/Sidebar';

export function App() {

  const posts = [
    {
      id: 1,
      author: {
        avatarUrl: 'https://github.com/felipedeamonteiro.png',
        name: 'Felipe Monteiro',
        role: 'CEO & CTO @ DojoFind'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋'},
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        { type: 'link', content: 'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2024-08-20 18:00:00'),
    },
    {
      id: 2,
      author: {
        avatarUrl: 'https://github.com/diego3g.png',
        name: 'Diego Fernandes',
        role: 'CTO @ Rocketseat'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋'},
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        { type: 'link', content: 'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2024-08-15 18:00:00'),
    },
    {
      id: 3,
      author: {
        avatarUrl: 'https://github.com/maykbrito.png',
        name: 'Mayk Brito',
        role: 'Educator @ Rocketseat'
      },
      content: [
        { type: 'paragraph', content: 'Fala galeraa 👋'},
        { type: 'paragraph', content: 'Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀'},
        { type: 'link', content: 'jane.design/doctorcare'},
      ],
      publishedAt: new Date('2024-08-10 18:00:00'),
    },
  ]

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => <Post key={post.id} author={post.author} content={post.content} publishedAt={post.publishedAt} />)}
        </main>
      </div>
    </div>
  )
}

