import React from 'react'
import { PostType } from '../typings'

interface IProps{
    post: PostType
}

const Comment = ({post}: IProps) => {
    // console.log(post.comments);
    return (
    
    <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        {post.comments.length === 0 ?
        <h3 className="font-bold">No Comments</h3>:
        <div>
            <h3 className="font-bold">Comments</h3>
            <hr />
            {post.comments.map((comment) => (
            <div key={comment._id} className="py-2">
                <div>
                    <span className="text-yellow-500">{comment.name}: </span>
                    {comment.comment}
                </div>
            </div>
            ))}
        </div>
        }        
    </div>
  )
}

export default Comment