import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });
    
    if (res?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/'); // Redirect to home on success
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
