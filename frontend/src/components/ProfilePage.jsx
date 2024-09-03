import { useSelector } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import userService from "../services/userService";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { projects, loading } = useSelector(({ projects }) => projects);
  const user = useSelector(({ user }) => user);
  const [followText, setFollowText] = useState("Follow");

  const match = useMatch("/users/:username");
  let userProjects = match
    ? projects.filter(p => p.user.username === match.params.username)
    : null
  
  if (userProjects.length === 0) {
    userProjects = null;
  }

  const ownProfile = user.username === match.params.username
    ? true
    : null

  useEffect(() => {
    const checkFollow = async () => {
      const isFollowed = await userService.checkFollow(user.id);
      setFollowText(isFollowed.data);
    };
    checkFollow();
  });

  const handleFollow = async (e) => {
    e.preventDefault();
    const currentUser = await userService.getOne(user.username);
    const targetUser = await userService.getOne(match.params.username);
    const relation = await userService.follow(currentUser.data.id, targetUser.data.id);

    if (relation.data === "Followed") {
      setFollowText("Unfollow");
    } else {
      setFollowText("Follow");
    }
  }

  return (
    <div className={"page-body"+ " " +"general-item"}>
      {!ownProfile && (
        <div>
            <div className="profile-header">
                <h1 className="title">{match.params.username}</h1>
                <button id="follow-button" className="btn btn-secondary" onClick={handleFollow}>{followText}</button>
            </div>
          <hr />
          <br />
        </div>
      )}
      {ownProfile && (
        <div>
          <h1 className="title">{match.params.username}</h1>
          <hr />
          <br />
        </div>
      )}
      {userProjects && (
        <div>
          <h3>Projects by {match.params.username}</h3>
          <br />
          <ul>
            {userProjects.map(p => (
              <li className="profile-list" key={p.id}><Link to={`/projects/${p.id}`}>{p.title}</Link> <p><i>on {p.createdAt.split("T")[0]}</i></p> </li>
            ))}
          </ul>
        </div>
      )}
      {!userProjects && (
        <div>
          <h5>No posts found.</h5>
          <br />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;