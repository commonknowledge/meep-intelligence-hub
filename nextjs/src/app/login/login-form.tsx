"use client";

import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { login } from "../../actions/auth";

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      errors
      success
      token {
        token
        payload {
          exp
        }
      }
    }
  }
`;

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [doLogin, { data, loading, error: gqlError }] =
    useMutation(LOGIN_MUTATION);

  const token = data?.tokenAuth?.token?.token;
  const authError = data?.tokenAuth?.errors;
  if (token) {
    login(token, data?.tokenAuth?.token?.payload?.exp);
  }

  let errorMessage = "";
  if (gqlError) {
    errorMessage = "Login request failed";
  }
  if (authError) {
    errorMessage = "Bad credentials or user not verified";
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    doLogin({ variables: { username, password } });
  };

  return (
    <form className="pb-4 flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <label className="mr-2" htmlFor="username">
          Username
        </label>
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
        <label className="mr-2" htmlFor="password">
          Password
        </label>
        <input
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Your Password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
        type="submit"
        disabled={loading}
      >
        Login
      </button>
      {errorMessage ? (
        <small className="text-red-500">{errorMessage}</small>
      ) : null}
    </form>
  );
}
