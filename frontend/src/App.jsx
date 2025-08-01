import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import HomeUser from './pages/HomeUser';
import ExportData from './pages/ExportData';
import Admin from './pages/Admin';
import Nav from './components/Nav';
import Footer from './components/Footer';

function AppWrapper() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/admin/login';

  return (
    <>
      {!isLoginPage && <Nav isAdmin={location.pathname.startsWith('/admin')} />}
      {isLoginPage && <Nav isAdmin={location.pathname.startsWith('/')} />}
      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/export" element={<ExportData />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
