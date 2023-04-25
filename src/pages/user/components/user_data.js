import { Link } from "react-router-dom";

export const UserData = (props) => {
  const user = props.user;
  const getAddress = props.getAddress;

  return (
    <tr className="contentrow">
      <td className="td">{user.name}</td>
      <td className="td">{user.email}</td>
      <td className="td">{getAddress(user.address)}</td>
      <td className="td">{user.phone}</td>
      <td className="td">
        <Link to={`/user-posts`} state={user.id}>
          View Posts
        </Link>
      </td>
    </tr>
  );
};
