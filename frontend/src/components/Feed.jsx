import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Feed = () => {
  const projects = useSelector(({ projects }) => projects);

  return (
    <div className={"page-body"+ " " +"general-item"}>
      <h1 className="title">Your Feed</h1>
      <ul>
      {projects.map(p => (
        <li key={p.id}>
          <div>
            <h3><Link to={`/projects/${p.id}`} >{p.title}</Link></h3>
          </div>
          <div>
            by <Link to={`/users/${p.user.username}`}><i>{p.user.username}</i></Link> on {p.updatedAt.split("T")[0]}
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default Feed;