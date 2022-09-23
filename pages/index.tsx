import Head from 'next/head'
import Router from 'next/router';
import { useState } from 'react';
import Header from '../components/Header'
import Post from '../components/Post';
import TitleCard from '../components/TitleCard';
import { sanityClient } from '../sanity';
import { PostType } from '../typings';
import Footer from '../components/Footer';


interface IProps{
  posts: [PostType]
}

const Home = ({posts}: IProps) => {
  
  const [loading, setLoading] = useState(false);
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setLoading(false)
  })
  Router.events.on('routeChangeError', () => setLoading(false))

  return (
     <div className="max-w-7xl mx-auto"> 
     {loading ?
        <div className="flex h-screen justify-center items-center">
          <img
            className="h-20 w-30" 
            src="https://miro.medium.com/max/1400/1*psYl0y9DUzZWtHzFJLIvTw.png" />
        </div>
        :<div>
          <Head>
            <title>Medium Blog</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <Header />
          <TitleCard />
          <Post posts={posts} />
          <Footer />
        </div>
      }
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts
    },
  }
}

