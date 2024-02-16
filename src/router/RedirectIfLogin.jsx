import { Navigate } from 'react-router-dom';
import useAuth from '../custom-hooks/use-auth';

export default function RedirectIfLogin({ children }) {
  const { authUser } = useAuth();
  if (authUser) {
    return <Navigate to="/home" />;
  }
  return children;
}
