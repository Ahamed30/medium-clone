import Link from 'next/link'
import React from 'react'
import { sanityClient, urlFor } from '../sanity';
import { PostType } from '../typings';
import PostCard from './PostCard';

interface IProps{
    posts: [PostType]
}

const Post = ({ posts }: IProps) => {
  return (
    <div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
    </div>
  )
}

export default Post

