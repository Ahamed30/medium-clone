import { createSlice } from "@reduxjs/toolkit"
import { PostType } from "../typings"
import { sanityClient } from '../sanity';

export interface IPostState{
    posts: Array<PostType>
}

const initialState: IPostState = {
    posts: [],
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addAllPosts: (state, action) => {
            state.posts = action.payload;
        },
    }
})

export const postActions = postSlice.actions;

export default postSlice.reducer; 

const getAllPosts = async () => {
    // const dispatch = useDispatch();
    console.log("Calledd");
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
    // dispatch(postActions.addAllPosts(posts));
    return posts;
  }
  
