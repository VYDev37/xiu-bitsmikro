import { getSession } from '@/lib/auth';
import NavbarClient from './NavbarClient';

export default async function Navbar() {
  const session = await getSession();
  const isLoggedIn = !!session.userId; // assuming session has userId when valid

  return <NavbarClient isLoggedIn={isLoggedIn} />;
}
