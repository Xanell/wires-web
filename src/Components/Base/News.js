import * as React from "react";
import { PostCard } from "../PostCard";
import { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SideMenu } from "../../Components/SideMenu";

import { GetPostByInterests } from "../../Redux/Slice/PostSlice";

export const News = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useLayoutEffect(() => {
    dispatch(GetPostByInterests());
  }, []);

  return (
    <>
      <div className="flex flex-row bg-gray-100">
        <SideMenu />
        <div className="container-md shadow-lg bg-white py-10 px-8 mx-[25rem] my-[1rem] rounded-md">
          {posts.map((posts) => (
            <PostCard key={posts.id} posts={posts} />
          ))}
        </div>
      </div>
    </>
  );
};
export default News;
