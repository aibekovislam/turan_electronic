import styles from '../../styles/brands_and_footer.module.scss';
import { ArrowProps } from '../../utils/interfacesAndTypes';

const ArrowDown = ({ isUp }: ArrowProps) => {
  return (
    <svg className={`${isUp ? styles.arrowUp : styles.arrowDown}`} width="22" height="14" viewBox="0 0 22 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0049 12.6199L0.629887 3.24487C0.365705 2.98069 0.217291 2.62238 0.217291 2.24878C0.217291 1.87517 0.365705 1.51686 0.629887 1.25268C0.894068 0.988503 1.25237 0.840088 1.62598 0.840088C1.99959 0.840088 2.35789 0.988503 2.62207 1.25268L10.9998 9.63276L19.3799 1.25503C19.5107 1.12422 19.666 1.02045 19.8369 0.949661C20.0078 0.878868 20.191 0.842431 20.376 0.842431C20.561 0.842431 20.7442 0.878868 20.9151 0.949661C21.086 1.02045 21.2413 1.12422 21.3721 1.25503C21.5029 1.38584 21.6066 1.54113 21.6774 1.71204C21.7482 1.88295 21.7847 2.06613 21.7847 2.25112C21.7847 2.43611 21.7482 2.61929 21.6774 2.7902C21.6066 2.96111 21.5029 3.11641 21.3721 3.24721L11.9971 12.6222C11.8663 12.7532 11.7109 12.857 11.5399 12.9278C11.3689 12.9986 11.1856 13.0349 11.0005 13.0347C10.8154 13.0344 10.6322 12.9977 10.4613 12.9265C10.2905 12.8553 10.1354 12.7511 10.0049 12.6199Z" fill={isUp ? '#FF7300' : '#52525280'} />
    </svg>
  );
};

export default ArrowDown;
