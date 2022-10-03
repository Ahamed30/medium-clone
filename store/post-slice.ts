import { createSlice } from "@reduxjs/toolkit"
import { PostType } from "../typings"

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


