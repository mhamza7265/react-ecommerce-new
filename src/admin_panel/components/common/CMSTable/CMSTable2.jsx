import TableRow2 from "./TableRow2";

function CMSTable2({
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
          <th>Text One</th>
          {!single && <th>Text Two</th>}
          <th>Text Align</th>
          {action && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data?.map((data, i) => (
          <TableRow2
            key={i}
            id={data._id}
            srNum={i + 1}
            image={data.image}
            text1={data.text1}
            text1Sub={data.text1Sub}
            text2={data.text2}
            text2Sub={data.text2Sub}
            text3={data.text3}
            text3Sub={data.text3Sub}
            align={data.textAlign}
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

export default CMSTable2;
