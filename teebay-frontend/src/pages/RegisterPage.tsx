import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useNavigate, Link } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client'

const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      id
      username
      email
    }
  }
`;

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState<RegisterFormValues>({
    firstName: '',
    lastName: '',
    username: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((p) => ({ ...p, [name]: value }))
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [register] = useMutation(REGISTER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await register({
        variables: {
          input: {
            first_name: formValues.firstName,
            last_name: formValues.lastName,
            username: formValues.username,
            phone: formValues.phone,
            email: formValues.email,
            password: formValues.password,
          },
        },
      });
      console.log('Registration success:', data);
      navigate('/login');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center p-8">
      <div className="w-full max-w-lg p-12 bg-white/95 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl text-center relative overflow-hidden">
        <div className="text-2xl font-bold mb-8 bg-gradient-to-r from-indigo-500 to-purple-700 bg-clip-text text-transparent">REGISTRATION</div>
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formValues.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2 space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formValues.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Address"
              value={formValues.address}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2 space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="Username"
                value={formValues.username}
                onChange={handleChange}
              />
            </div>
            <div className="w-1/2 space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="Phone Number"
                value={formValues.phone}
                onChange={handleChange}
              />
            </div>
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
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((p) => !p)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" className="w-full">
            REGISTER
          </Button>
        </form>
        <div className="text-sm mt-8 text-slate-600">
          Already have an account? <Link to="/login" className="text-indigo-600 hover:underline">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
