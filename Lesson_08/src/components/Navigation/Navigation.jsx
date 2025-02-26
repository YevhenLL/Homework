import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export default function Navigation() {
  return (
    <nav className="navigation">
      <div className="nav-item">
        <Link to={ROUTES.HOME}>Home</Link>
      </div>
      <div className="nav-item">
        <Link to={ROUTES.COUNTRIES}>Countries</Link>
      </div>
    </nav>
  );
}