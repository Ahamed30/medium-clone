import React from 'react'
import { urlFor } from '../sanity'
import { PostType } from '../typings'
import PortableText from 'react-portable-text'
import CommentForm from './CommentForm';
import Comment from './Comment';


interface IProps{
    post: PostType
}

const Blog = ({ post }: IProps) => {

  return (
    <div>
        <img
        className="w-full h-40 object-cover" 
        src={urlFor(post.mainImage).url()} alt="" />
        <article className='max-w-3xl mx-auto p-5'>
            <h1 className="font-display text-3xl mt-10 mb-3">{post.title}</h1>
            <h2 className="font-mono text-xl text-light my-3">{post.description}</h2>
        
            <div className="flex items-center space-x-2">
                <img 
                className="h-10 w-10 rounded-full"
                src={urlFor(post.author.image).url()}
                alt="" />
                <p className="font-extralight text-sm">
                    Blog post by{" "} 
                    <span className="text-green-600">{post.author.name}</span> - Published at{" "}
                    {new Date(post._createdAt).toLocaleString()}
                </p>
            </div>

            <div className="mt-5">
                <PortableText
                    className='font-body text-base'
                    dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
                    projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}  
                    content={post.body}
                    serializers={{
                        h1: (props: String) => (
                          <h1 className="font-display my-5 text-3xl font-bold" {...props} />
                        ),
                        h2: (props: String) => (
                          <h2 className="font-display my-5 text-2xl font-bold" {...props} />
                        ),
                        li: ({ children }: any) => (
                          <li className="ml-4 list-disc">{children}</li>
                        ),
                        link: ({ href, children }: any) => (
                          <a href={href} className="text-blue-500 hover:underline">
                            {children}
                          </a>
                        ),
                      }}             
                />
            </div>
        </article>
        <hr className="max-w-lg my-5 mx-auto border-yellow-500" />
        <CommentForm post={post} />
        <Comment post={post} />
    </div>
    
  )
}

export default Blog