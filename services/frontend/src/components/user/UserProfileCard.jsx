function UserProfileCard({ user }) {
  if (!user) {
    return null;
  }

  return (
    <article className="card">
      <h2>Perfil de usuario</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Nombre:</strong> {user.name}
      </p>
      <p>
        <strong>Correo:</strong> {user.email}
      </p>
      <p>
        <strong>Rol:</strong> {user.role}
      </p>
      <p className="muted">
        Este perfil puede operar en modo API o mock, segun configuracion.
      </p>
    </article>
  );
}

export default UserProfileCard;
