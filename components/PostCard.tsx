import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity';
import { PostType } from '../typings';

interface IProps{
    post: PostType; //array of posts
  }

const PostCard = ({ post }: IProps) => {
  // console.log(post._id);
  return (
    <Link href={`/post/${post.slug.current}`}>
        <div className="border rounded-lg group cursor-pointer overflow-hidden">
            <img
            className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out" 
            src={
            urlFor(post.mainImage).url()
            } alt="" />
            <div className="flex justify-between p-5 bg-white">
            <div>
                <p className="font-serif text-lg font-bold">{post.title}</p>
                <p className='text-xs'>
                {post.description} by {post.author.name}
                </p>
            </div>
            <img
                className="h-12 w-12 rounded-full" 
                src={urlFor(post.author.image).url()} alt="" />
            </div>
        </div>
    </Link>
  )
}

export default PostCard