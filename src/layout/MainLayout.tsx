import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Navbar from '../components/navbar';

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
