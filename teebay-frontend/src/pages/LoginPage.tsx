import { useState } from 'react'
import { EyeIcon, EyeOffIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useAuth } from '../auth/AuthContext';

const LOGIN = gql`
  mutation Login($handle: String!, $password: String!) {
    login(input: { handle: $handle, password: $password }) {
      id
      first_name
      last_name
      username
      phone
      email
      address
    }
  }
`;

type LoginFormValues = {
  handle: string;
  password: string;
};

export default function LoginPage() {
  const { user, login } = useAuth();

  if (user) return <Navigate to="/products" />;

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formValues, setFormValues] = useState<LoginFormValues>({
    handle: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((p) => ({ ...p, [name]: value }))
  }

  const [validateLogin, { loading }] = useMutation(LOGIN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('');
    try {
      const res = await validateLogin({
        variables: { handle: formValues.handle, password: formValues.password },
      });
      const user = res.data.login;
      login({ id: user.id, username: user.username });
      navigate('/products');
    } catch (error: any) {
      setErrorMessage(`Login failed: ${error.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center p-8">
      <div className="w-full max-w-md p-12 bg-white/95 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl text-center relative overflow-hidden">
        <div className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-700 bg-clip-text text-transparent">SIGN IN</div>

        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="space-y-2">
            <Label htmlFor="handle">Email/Username/Phone</Label>
            <Input
              id="handle"
              name="handle"
              placeholder="Your handle"
              value={formValues.handle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
              >
                {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-600 text-sm">{errorMessage}</p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            LOGIN
          </Button>
        </form>

        <div className="text-sm mt-8 text-slate-600">
          Don&apos;t have an account? <Link to="/register" className="text-indigo-600 hover:underline">Signup</Link>
        </div>
      </div>
    </div>
  );
}
