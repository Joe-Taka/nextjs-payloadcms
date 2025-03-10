function UserRoles() {
  return (
    <table>
      <tr>
        <th>Role</th>
        <th>Acesso de coleções</th>
        <th>Country</th>
      </tr>
      <tr>
        <td>Admin</td>
        <td>Editor</td>
        <td>Leitor</td>
      </tr>
      <tr>
        <td>Todos</td>
        <td>Todos menos: users</td>
        <td>Nenhum</td>
      </tr>
    </table>
  )
}

export default UserRoles
