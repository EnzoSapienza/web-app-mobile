import styles from './style.module.css';
import useIsPWA from '../../services/pwa/useIsPwa';
import useNetworkStatus from '../../services/pwa/useNetworkStatus';
import useScrollDirection from '../../services/useScollDirection';

export default function NetworkBanner() {
  const isPWA = useIsPWA();
  const isOnline = useNetworkStatus();
  const scrollDir = useScrollDirection();

  if (!isPWA) return null;

  return (
    <div
      className={[
        styles.banner,
        isOnline ? styles.online : styles.offline,
        scrollDir === 'down' ? styles.scrollDown : '',
      ].join(' ')}
    >
      {isOnline ? 'You are connected' : 'You are offline!'}
    </div>
  );
}
