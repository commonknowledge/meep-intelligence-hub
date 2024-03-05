'use client'

import { useState } from 'react';
import { gql } from '@apollo/client';
import { client } from '../../apollo-client';


const LoginMutation = gql`
mutation Login($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    errors
    success
    token {
      token
    }
  }
}
`;

const doLogin = (token: string) => {
  localStorage.setItem('jwt', token);
  window.location.href = '/account';
  document.cookie = `jwt=${token}; path=/;` // TODO: add expires= to match the JWT value
};

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const { data } = await client.mutate({
        mutation: LoginMutation,
        variables: { username, password },
      });

      const token = data?.tokenAuth?.token?.token;
      if (token) {
        doLogin(token)
      } else {
        console.error('Login failed: ', data?.tokenAuth?.errors);
      }
    } catch (error) {
      console.error('Login error: ', error);
    }
  };

  return (
    <>
      <form className="pb-4 flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label className="mr-2" htmlFor="username">Username</label>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            id="username"
            type="text"
            placeholder="Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label className="mr-2" htmlFor="password">Password</label>
          <input
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Your Password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="bg-gray-500 text-white font-bold py-2 px-4 rounded" type="submit">Login</button>
      </form>
    </>
  );
}
