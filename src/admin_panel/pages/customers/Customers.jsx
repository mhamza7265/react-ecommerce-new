import sendRequest, { errorToast } from "../../../utility-functions/apiManager";
import { useState, useEffect } from "react";
import CustomerRow from "./CustomerRow";

function Customers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    sendRequest("get", "users?type=basic")
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
  }, []);

  const handleBlockUnblockClick = (e) => {
    const btnType = e.currentTarget.getAttribute("data");
    const userId = e.target.closest(".customer-row").getAttribute("data");
    if (confirm(`Do you want to ${btnType} this user?`)) {
      sendRequest("put", "user/lock", {
        userId,
        blocked: btnType == "block" ? true : false,
        type: "basic",
      })
        .then((res) => {
          if (res.status) {
            setUsers(res.users);
          } else {
            errorToast(res.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4">Customers</h3>
      <table className="bg-white">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users?.map((item, i) => (
              <CustomerRow
                key={i}
                id={item._id}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                role={item.role}
                status={item.blocked}
                handleBlockUnblockClick={handleBlockUnblockClick}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
