import TableRow3 from "./TableRow3";

function CMSTable3({
  data,
  section,
  handleEditClick,
  handleDeleteClick,
  single,
  editValues,
  three,
  action,
}) {
  return (
    <table
      style={{
        backgroundColor: "white",
        width: "90%",
        margin: "20px auto 0 auto",
      }}
      className="cms-table"
    >
      <thead>
        <tr>
          <th>Sr. No#</th>
          <th>Address</th>
          <th>Email</th>
          <th>Contact No#</th>
          <th>Location</th>
          {action && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((data, i) => (
          <TableRow3
            key={i}
            id={data._id}
            srNum={i + 1}
            image={data.image}
            address={data.address}
            email={data.email}
            contact={data.contact}
            location={data.location}
            single={single}
            handleEdit={handleEditClick}
            handleDelete={handleDeleteClick}
            section={section}
            editValues={editValues}
            three={three}
            action={action}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CMSTable3;
