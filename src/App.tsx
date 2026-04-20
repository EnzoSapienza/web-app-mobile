import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Layout from './layout/MainLayout';
import Wishlist from './pages/Wishlist';
import History from './pages/History';
import Details from './pages/Details';
import Contact from './pages/Contact';
import { useGlobalFocus } from './services/focusHook';

function App() {
  // Si vino con foco a un elemento, encofar a ese elemento.
  useGlobalFocus();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/history" element={<History />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}

export default App;
