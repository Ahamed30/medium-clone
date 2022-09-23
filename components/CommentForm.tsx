import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { PostType } from '../typings';

interface IFormInput{
    _id: string;
    name: string;
    email: string;
    comment: string;
}

interface IProps{
    post: PostType
}

const CommentForm = ({post}: IProps) => {
    const { register, handleSubmit, formState: {errors} } = useForm<IFormInput>();
    const [ submitted, setSubmitted ] = useState(false);

  
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        fetch('/api/createComment', {
        method: 'POST',
        body: JSON.stringify(data),
        }).then(() => {
        console.log(data);
        setSubmitted(true);
        }).catch((err) => {
        console.log(err);
        setSubmitted(true);
        });
    };

    return submitted ? 
            (<div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold">Thank you for submitting the content!</h3>
              <p>Once it has been approved, it will appear below!</p>
            </div>)
          :(<form onSubmit = {handleSubmit(onSubmit)} className="flex flex-col p-5 max-w-2xl mx-auto mb-10">
            <h3 className="text-sm text-yellow-500">Enjoyed the article?</h3>
            <h4 className="text-3xl font-bold">Leave a comment below!</h4>
            <hr className="py-3 mt-2" />
  
            <input 
              {...register("_id")}
              type="hidden"
              name="_id"
              value={post._id}
            />
  
            <label className="block mb-5">
              <span className="text-gray-700">Name</span>
              <input
              {...register("name", { required: true })}
              className="shadow border rounded my-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1" placeholder="John Appleseed" type="text" />
            </label>
            <label className="block mb-5">
              <span className="text-gray-700">Email</span>
              <input
              {...register("email", { required: true })}
              className="shadow border rounded my-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring-1" placeholder="John Appleseed" type="text" />
            </label>
            <label className="block mb-5">
              <span className="text-gray-700">Comment</span>
              <textarea 
              {...register("comment", { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring-1" placeholder="John Appleseed" rows={8} />
            </label>
            <div className="flex flex-col p-5">
              {errors.name && (
                <span className="text-red-500">- The name field is required</span>
              )}
              {errors.comment && (
                <span className="text-red-500">- The comment field is required</span>
              )}
              {errors.email && (
                <span className="text-red-500">- The Email field is required</span>
              )}
            </div>
  
            <input type="submit"
              className="shadow 
              bg-yellow-500 hover:bg-yellow-400 
              focus:shadow-outline focus:outline-none 
              text-white font-bold py-2 px-4 rounded cursor-pointer" />
          </form>
    )
}

export default CommentForm