import Head from 'next/head'
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../components/Header'
import Post from '../components/Post';
import TitleCard from '../components/TitleCard';
import { PostType } from '../typings';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { postActions } from '../store/post-slice';
import { sanityClient } from '../sanity';
import { fetchPost } from '../store/post-actions';
import store from '../store';


interface IProps{
  posts: [PostType]
}

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);
  Router.events.on('routeChangeStart', (url) => {
    setLoading(true)
  })
  Router.events.on('routeChangeComplete', () => {
    setLoading(false)
  })
  Router.events.on('routeChangeError', () => setLoading(false))

  useEffect(() =>{
    // dispatch(postActions.addAllPosts(posts));
    store.dispatch(fetchPost());
    setDomLoaded(true);
  }, [dispatch])

  return (
    <>
    {domLoaded && (
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
          <Post />
          <Footer />
        </div>
      }
    </div>)}
    </>
  )
}

export default Home

// export const getServerSideProps = async () => {
//   // const dispatch = useDispatch();
//   console.log("Calledd");
//   const query = `*[_type == "post"]{
//     _id,
//     title,
//     author-> {
//       name,
//       image
//     },
//     description,
//     mainImage,
//     slug
//   }`;
//   const posts = await sanityClient.fetch(query);
//   // dispatch(postActions.addAllPosts(posts));
//   return {
//     props: {
//       posts
//     },
//   }
// }

