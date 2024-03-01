import { useEffect } from "react";
import sendRequest from "../../../utility-functions/apiManager";
import { useState } from "react";
import AdminsRow from "./AdminsRow";

function Admins() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    sendRequest("get", "users?type=admin")
      .then((res) => {
        if (res.status) {
          setUsers(res.users);
        } else {
          console.log("error fetching users list");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <div className="container">
      <h3 className="mb-4">Admins</h3>
      <table className="bg-white">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((item, i) => (
              <AdminsRow
                key={i}
                id={item._id}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                role={item.role}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admins;
