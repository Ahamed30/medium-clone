import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import PostCard from './PostCard';



const Post = () => {
  const posts = useSelector((state: RootState) => state.post.posts);
  return (
    <div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6'>
        {posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))}
    </div>
  )
}

export default Post

