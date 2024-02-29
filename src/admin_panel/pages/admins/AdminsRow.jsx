function AdminsRow({ id, firstName, lastName, email, role }) {
  return (
    <tr data={id}>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{role}</td>
    </tr>
  );
}

export default AdminsRow;
