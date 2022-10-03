import { sanityClient } from "../sanity";
import { postActions } from "./post-slice";

export const fetchPost = () => {
    return async (dispatch: (arg0: { payload: any; type: string; }) => void) => {
        const fetchHandler = async () => {
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
            const postData = await sanityClient.fetch(query);
            console.log(postData);
            return postData;
        }
        try{
            const postData = await fetchHandler();
            dispatch(postActions.addAllPosts(postData));
        }catch(err){
            console.error(`Error while getting post data ${err}`);
        }
    }
}