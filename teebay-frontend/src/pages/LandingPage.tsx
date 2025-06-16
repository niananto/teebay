import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to TeeBay</h1>
      <p>Your one-stop shop for buying and selling t-shirts.</p>
      <p>Explore our products, manage your transactions, and enjoy a seamless experience.</p>
      <p><Link to={'/login'}>Login</Link> or <Link to={'/register'}>Register</Link> to get started!</p>
    </div>
  );
}