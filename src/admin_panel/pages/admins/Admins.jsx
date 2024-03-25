import { useEffect } from "react";
import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useState } from "react";
import AdminsRow from "./AdminsRow";
import Paginate from "../../components/paginate/Paginate";
import { useSelector } from "react-redux";

function Admins() {
  const [users, setUsers] = useState(null);
  const currentUser = useSelector((state) => state?.currentUser?.user);

  useEffect(() => {
    sendRequest(
      "get",
      "users/listing?type=admin",
      undefined,
      undefined,
      "admin"
    )
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
    const userId = e.target.closest(".admin-row").getAttribute("data");
    if (confirm(`Do you want to ${btnType} this user?`)) {
      sendRequest(
        "put",
        "user/lock",
        {
          userId,
          blocked: btnType == "block" ? true : false,
          type: "admin",
        },
        undefined,
        "admin"
      )
        .then((res) => {
          if (res.status) {
            sendRequest(
              "get",
              `users/listing?type=admin&page=${users?.page}`,
              undefined,
              undefined,
              "admin"
            )
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
          } else {
            errorToast(res.error);
          }
        })
        .catch((err) => {
          console.log(err);
          errorToast(err);
        });
    } else {
      return;
    }
  };

  const handleDeleteClick = (e) => {
    const userId = e.currentTarget.closest(".admin-row").getAttribute("data");
    if (confirm("Do you want to remove this user?")) {
      sendRequest("delete", "user", { userId }, undefined, "admin")
        .then((res) => {
          if (res.status) {
            successToast(res.message);
            sendRequest(
              "get",
              `users/listing?page=${users?.page}&type=admin`,
              undefined,
              undefined,
              "admin"
            )
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
          } else {
            console.log(res);
            errorToast(res.error);
          }
        })
        .catch((err) => {
          console.log(err);
          errorToast(err);
        });
    } else {
      return;
    }
  };

  return (
    <div className="container">
      <h3 className="mb-4">Admins</h3>
      <table className="bg-white">
        <thead>
          <tr>
            <th>Serial#</th>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Account Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.docs?.length > 0 ? (
            users?.docs?.map((item, i) => (
              <AdminsRow
                key={i}
                serial={users?.pagingCounter - 1 + i}
                id={item._id}
                firstName={item.firstName}
                lastName={item.lastName}
                image={item.image}
                email={item.email}
                status={item.blocked}
                role={item.role}
                handleBlockUnblockClick={handleBlockUnblockClick}
                handleDeleteClick={handleDeleteClick}
                currentUserRole={currentUser?.role}
              />
            ))
          ) : (
            <tr>
              <td colSpan={"100%"} className="text-center">
                No admin(s) found
              </td>
            </tr>
          )}
          <Paginate
            endPoint={"users/listing"}
            state={users}
            setState={setUsers}
            formType={"users"}
            query={"admin"}
          />
        </tbody>
      </table>
    </div>
  );
}

export default Admins;
