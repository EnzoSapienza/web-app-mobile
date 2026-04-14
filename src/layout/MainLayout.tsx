import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Navbar from '../components/navbar';
import './MainLayout.css';

export default function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
