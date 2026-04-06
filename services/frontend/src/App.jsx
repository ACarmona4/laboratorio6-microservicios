import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import BookScreen from './screens/BookScreen.jsx';
import PurchaseScreen from './screens/PurchaseScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/books/:bookId" element={<BookScreen />} />
          <Route path="/books/:bookId/purchase" element={<PurchaseScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
