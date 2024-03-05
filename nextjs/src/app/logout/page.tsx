import { useRequireAuth } from '../../hooks/auth';
import Logout from './logout';

export default function LogoutPage() {
  useRequireAuth(); 

  return <Logout />
}