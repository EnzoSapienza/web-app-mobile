import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Navbar from '../components/navbar';
import './MainLayout.css';
import NetMessage from '../components/netMessage';

export default function Layout() {
  return (
    <>
      <Header />
      <NetMessage />;
      <main className="mainPage">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
