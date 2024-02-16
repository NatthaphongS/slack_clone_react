import { Navigate } from 'react-router-dom';
import useAuth from '../custom-hooks/use-auth';

export default function RedirectIfNotLogin({ children }) {
  const { authUser } = useAuth();
  if (!authUser) {
    return <Navigate to="/" />;
  }
  return children;
}
