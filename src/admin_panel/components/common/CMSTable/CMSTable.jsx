import TableRow from "./TableRow";

function CMSTable({ data, handleEditClick, handleDeleteClick }) {
  return (
    <table
      style={{
        backgroundColor: "white",
        width: "90%",
        margin: "20px auto 0 auto",
      }}
    >
      <thead>
        <tr>
          <th>Sr. No#</th>
          <th>Image</th>
          <th>Text One</th>
          <th>Text Two</th>
          <th>Text Align</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((data, i) => (
          <TableRow
            key={i}
            id={data._id}
            srNum={i + 1}
            image={data.image}
            text1={data.text1}
            text2={data.text2}
            align={data.textAlign}
            handleEdit={handleEditClick}
            handleDelete={handleDeleteClick}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CMSTable;
