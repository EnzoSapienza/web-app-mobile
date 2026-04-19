import { type ReactElement } from 'react';
import styles from './style.module.css';

interface Props {
    children: ReactElement | ReactElement[];
}

export default function ArtGrid({ children }: Props) {
    return (
    <ul className={styles.grid}>
        {Array.isArray(children)
        ? children.map((child) => (
        <li key={child.key} className={styles.item}>
            {child}
        </li>
        ))
        : <li className={styles.item}>{children}</li>
        }
    </ul>
    );
}