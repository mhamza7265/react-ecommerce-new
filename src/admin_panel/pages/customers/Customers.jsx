import sendRequest, {
  errorToast,
  successToast,
} from "../../../utility-functions/apiManager";
import { useState, useEffect } from "react";
import CustomerRow from "./CustomerRow";
import Paginate from "../../components/paginate/Paginate";

function Customers() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    sendRequest(
      "get",
      "users/listing?type=basic",
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
    const userId = e.target.closest(".customer-row").getAttribute("data");
    if (confirm(`Do you want to ${btnType} this user?`)) {
      sendRequest(
        "put",
        "user/lock",
        {
          userId,
          blocked: btnType == "block" ? true : false,
          type: "basic",
        },
        undefined,
        "admin"
      )
        .then((res) => {
          if (res.status) {
            sendRequest(
              "get",
              `users/listing?type=basic&page=${users?.page}`,
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
        });
    } else {
      return;
    }
  };

  const handleDeleteClick = (e) => {
    const userId = e.currentTarget
      .closest(".customer-row")
      .getAttribute("data");
    if (confirm("Do you want to remove this user?")) {
      sendRequest("delete", "user", { userId }, undefined, "admin")
        .then((res) => {
          if (res.status) {
            successToast(res.message);
            sendRequest(
              "get",
              `users/listing?page=${users?.page}&type=basic`,
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

  const changeRole = (id, role) => {
    sendRequest("post", "changeRole", { id, role }, undefined, "admin")
      .then((res) => {
        if (res.status) {
          sendRequest(
            "get",
            `users/listing?page=${users?.page}&type=basic`,
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
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h3 className="mb-4">Customers</h3>
      <table className="bg-white">
        <thead>
          <tr>
            <th>Serial#</th>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Change Role</th>
            <th>Account Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.docs?.length > 0 ? (
            users?.docs?.map((item, i) => (
              <CustomerRow
                key={i}
                image={item.image}
                serial={users?.pagingCounter - 1 + i}
                id={item._id}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                role={item.role}
                status={item.blocked}
                handleBlockUnblockClick={handleBlockUnblockClick}
                handleDeleteClick={handleDeleteClick}
                changeRole={changeRole}
              />
            ))
          ) : (
            <tr>
              <td colSpan={"100%"} className="text-center">
                No customer(s) found
              </td>
            </tr>
          )}
          <Paginate
            endPoint={"users/listing"}
            state={users}
            setState={setUsers}
            formType={"users"}
            query={"basic"}
          />
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
