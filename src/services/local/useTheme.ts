import { useEffect } from 'react';
import useLocalStorage from './localStorage';

export default function useTheme() {
    const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('app-theme', 'light');
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };
    return { theme, toggleTheme };
}