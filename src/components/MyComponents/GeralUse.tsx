export function UserRoles() {
  return (
    <table className="m-4 w-full">
      <thead className="bg-blue-700">
        <tr>
          <th>Privilégio</th>
          <th>Acesso a coleções</th>
        </tr>
      </thead>
      <tbody className="bg-blue-700">
        <tr>
          <td>Admin</td>
          <td>Todos</td>
        </tr>
        <tr>
          <td>Editor</td>
          <td>Todos menos: Users</td>
        </tr>
        <tr>
          <td>Leitor</td>
          <td>Nenhum</td>
        </tr>
      </tbody>
    </table>
  )
}
