import { useEffect, useState } from 'react';
import { ordersClient } from '../api/ordersClient.js';
import ErrorState from '../components/common/ErrorState.jsx';
import LoadingState from '../components/common/LoadingState.jsx';
import UserProfileCard from '../components/user/UserProfileCard.jsx';
import { useUser } from '../context/UserContext.jsx';

const formatMoney = (value) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);

function ProfileScreen() {
  const { user, isLoadingUser, userError, updateUser } = useUser();
  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  });
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const loadOrders = async () => {
    if (!user?.id) {
      setIsLoadingOrders(false);
      return;
    }

    setIsLoadingOrders(true);
    setOrdersError('');

    try {
      const data = await ordersClient.getOrdersByUserId(user.id);
      setOrders(data);
    } catch (error) {
      setOrdersError(error.message || 'No fue posible cargar las ordenes');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [user?.id]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSaveError('');
    setIsSavingProfile(true);

    try {
      await updateUser({
        name: profileForm.name.trim(),
        email: profileForm.email.trim(),
      });
    } catch (error) {
      setSaveError(error.message || 'No fue posible actualizar el perfil temporal');
    } finally {
      setIsSavingProfile(false);
    }
  };

  if (isLoadingUser) {
    return (
      <section className="container page">
        <LoadingState message="Cargando usuario..." />
      </section>
    );
  }

  if (userError) {
    return (
      <section className="container page">
        <ErrorState message={userError} />
      </section>
    );
  }

  return (
    <section className="container page">
      <h1>Perfil de usuario</h1>
      <p className="muted">
        Modulo de usuario conectado al users-service cuando VITE_USERS_MODE=api.
      </p>

      <div className="two-columns">
        <div>
          <UserProfileCard user={user} />
          <form onSubmit={handleProfileSubmit} className="card profile-form">
            <h3>Editar datos temporales</h3>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              value={profileForm.name}
              onChange={(event) => setProfileForm((prev) => ({ ...prev, name: event.target.value }))}
              required
              disabled={isSavingProfile}
            />
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              type="email"
              value={profileForm.email}
              onChange={(event) =>
                setProfileForm((prev) => ({ ...prev, email: event.target.value }))
              }
              required
              disabled={isSavingProfile}
            />
            <button type="submit" className="btn" disabled={isSavingProfile}>
              {isSavingProfile ? 'Guardando...' : 'Guardar perfil temporal'}
            </button>
            {saveError ? <p className="state-error-inline">{saveError}</p> : null}
          </form>
        </div>

        <div className="card">
          <h2>Historial de ordenes</h2>
          {isLoadingOrders ? <LoadingState message="Cargando ordenes..." /> : null}
          {!isLoadingOrders && ordersError ? (
            <ErrorState message={ordersError} onRetry={loadOrders} />
          ) : null}
          {!isLoadingOrders && !ordersError && !orders.length ? (
            <p className="muted">No tienes ordenes registradas.</p>
          ) : null}
          {!isLoadingOrders && !ordersError && orders.length ? (
            <ul className="order-list">
              {orders.map((order) => (
                <li key={order.id}>
                  <strong>{order.bookName}</strong> x{order.quantity} -{' '}
                  {formatMoney(order.total)} ({order.status})
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default ProfileScreen;
