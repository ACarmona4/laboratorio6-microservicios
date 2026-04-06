import { Link, NavLink } from 'react-router-dom';
import { APP_CONFIG } from '../../config/env.js';
import { useUser } from '../../context/UserContext.jsx';

function Header() {
  const { user } = useUser();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="brand">
          {APP_CONFIG.appName}
        </Link>
        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')} end>
            Catalogo
          </NavLink>
          <NavLink to="/profile" className={({ isActive }) => (isActive ? 'active' : '')}>
            Perfil
          </NavLink>
        </nav>
        <div className="user-chip">{user?.name || 'Usuario'}</div>
      </div>
    </header>
  );
}

export default Header;
