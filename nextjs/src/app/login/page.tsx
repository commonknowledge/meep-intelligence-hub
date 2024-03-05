import { useRequireAuth } from '../../hooks/auth';
import Login from './login';


export default function LoginPage() {
  useRequireAuth();

  return <Login />
}
