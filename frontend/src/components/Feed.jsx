import { Link, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userService from "../services/userService";

const Feed = () => {
  const { projects, loading } = useSelector(({ projects }) => projects);
  const user = useSelector(({ user }) => user);
  const [followedProjects, setFollowedProjects] = useState([]);
  const [shouldFetchFollowings, setShouldFetchFollowings] = useState(false);

  // add logic for filtering projects!!
  const match = useMatch("/home/following");

  useEffect(() => {
    if (!loading) {
      if (match && !shouldFetchFollowings) {
        setShouldFetchFollowings(true); // trigger fetching on match
      }
    }
 }, [match, loading]);

  useEffect(() => {
    const getFollowingsArray = async () => {
      const followings = await userService.getFollowings(user.id);
      const tempArr = projects.filter(project => followings.data.includes(project.userId));
      setFollowedProjects(tempArr);
    }
    if (shouldFetchFollowings) {
      getFollowingsArray();
      setShouldFetchFollowings(false); // reset the trigger
    }
  }, [shouldFetchFollowings, projects]);

  useEffect(() => {
    console.log(followedProjects);
 }, [followedProjects]);

  return (
    <div className={"page-body"+ " " +"general-item"}>
      {!match && (
        <div>
          <h1 className="title">Your Feed</h1>
          <ul>
          {projects.map(p => (
            <li key={p.id}>
              <div>
                <h3><Link to={`/projects/${p.id}`} >{p.title}</Link></h3>
              </div>
              <div>
                by <Link to={`/users/${p.user.username}`}><i>{p.user.username}</i></Link> on {p.createdAt.split("T")[0]}
              </div>
            </li>
          ))}
          </ul>
        </div>
      )}
      {match && (
        <div>
          <h1 className="title">Posts by followed users</h1>
          <ul>
            {followedProjects.map(p => (
                <li key={p.id}>
                <div>
                  <h3><Link to={`/projects/${p.id}`} >{p.title}</Link></h3>
                </div>
                <div>
                  by <Link to={`/users/${p.user.username}`}><i>{p.user.username}</i></Link> on {p.createdAt.split("T")[0]}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Feed;