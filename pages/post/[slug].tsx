import { GetStaticProps } from "next"
import Blog from "../../components/Blog"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { sanityClient } from "../../sanity"
import { PostType } from "../../typings"

interface Props{
  post: PostType
}

const Post = ({post}: Props) => {
  // console.log(post)
  return (
    <div>
      <main>
        <Header />
        <Blog post={post} />
        <Footer />
      </main>
    </div>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == "post"]{
    _id,
    title,
    slug {
      current
    }
  }`;
  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: PostType) => ({
    params: {
      slug: post.slug.current
    }
  }))

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == 'comment' &&
      post._ref == ^._id &&
      approved == true],
    description,
    mainImage,
    slug,
    body
  }`;
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  })
  if(!post){
    console.log("helloo")
    return {
      notFound: true
    }
  }
  return {
    props:{
      post,
    },
    revalidate: 60 // after 60s, it will update old cached version 
  }
}