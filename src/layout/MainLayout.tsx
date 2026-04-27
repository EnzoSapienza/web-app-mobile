import { Outlet } from 'react-router-dom';
import Header from '../components/header';
import Navbar from '../components/navbar';
import './MainLayout.css';
import useIsPWA from '../services/pwa/useIsPwa';
import useNetworkStatus from '../services/pwa/useNetworkStatus';

export default function Layout() {
  const isPWA = useIsPWA();
  const isOnline = useNetworkStatus();

  return (
    <>
      <Header />
      <div
        className={`networkMessage ${isPWA && !isOnline ? 'offline' : 'online'}`}
      >
        {isPWA && !isOnline ? 'You are offline!' : 'You are connected'}
      </div>
      ;
      <main className="mainPage">
        <Outlet />
      </main>
      <Navbar />
    </>
  );
}
