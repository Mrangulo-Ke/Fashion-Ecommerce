import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      });
      router.push('/admin');
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="container">
      <div>
        <h1 className="">Admin Dashboard</h1>
        <input
          placeholder="username"
          className="w-full"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className="w-full"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mb-4 pt-6 ">
          <button className="primary-button" onClick={handleClick}>
            Sign In
          </button>
          {error && <span>Wrong Credentials!</span>}
        </div>
      </div>
    </div>
  );
}
