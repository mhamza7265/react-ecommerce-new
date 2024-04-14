import TableRow from "./TableRow";

function CMSTable({ data, handleEditClick, handleDeleteClick, single }) {
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
          <th>Image</th>
          <th>Text One</th>
          {!single && <th>Text Two</th>}
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
            text1Sub={data.text1Sub}
            text2={data.text2}
            text2Sub={data.text2Sub}
            align={data.textAlign}
            single={single}
            handleEdit={handleEditClick}
            handleDelete={handleDeleteClick}
          />
        ))}
      </tbody>
    </table>
  );
}

export default CMSTable;
