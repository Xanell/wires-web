import * as React from "react";
import { useSelector } from "react-redux";
import { SideMenu } from "../../Components/SideMenu";
import { InterestsChange } from "../InterestsChange";
import { PostCard } from "../PostCard";


export const Profile = () => {
  const userName = useSelector((state) => state.user.username);
  const avatar_url = useSelector((state) => state.user.avatar_url);
  const first_name = useSelector((state) => state.user.first_name);
  const last_name = useSelector((state) => state.user.last_name);
  const interests = useSelector((state) => state.user.interests);
  const posts = useSelector((state) => state.user.posts);

  return (
    <>
      <div className="flex flex-row bg-gray-100">
        <SideMenu />
        <div className="container mx-10 my-4 shadow-lg text-center rounded-lg bg-white">
          <div className="flex flex-col">
            <div className="bg-wires-main h-[15.30rem] rounded-t-lg">
              <img
                src={avatar_url}
                className="mx-auto w-[16rem] h-[16rem] rounded-full mt-12"
              />
            </div>
            <div className="Font-Inter text-name font-semibold mt-16 text-2xl">
              {first_name} {last_name}
            </div>
            <div className="text-name text-xl">@{userName}</div>
          </div>
          <div className="flex flex-row mt-12">
            {posts.map((posts) => (
              <PostCard key={posts.id} posts={posts} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Profile;
