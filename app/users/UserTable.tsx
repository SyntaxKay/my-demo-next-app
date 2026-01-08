import { sort } from "fast-sort";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  sortOrder: 'asc' | 'desc';
}

const UserTable = async ({ sortOrder = "asc" }: Props) => {
  const data = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: {
      tags: ["users"],
    },
  });

  const users: User[] = await data.json();
  const sortedUsers =
    sortOrder === "desc"
      ? sort(users).by([{ desc: (u) => u.name }])
      : sort(users).by([{ asc: (u) => u.name }]);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
