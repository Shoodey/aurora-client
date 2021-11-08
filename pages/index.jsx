import React from "react";
import Link from "next/link";

function Landing() {
  return (
    <div>
      <h1>Tervetulua!</h1>
      <ul>
        <li>
          <Link href="/auth/login">
            <a>Login</a>
          </Link>
        </li>
        <li>
          <Link href="/auth/register">
            <a>Register</a>
          </Link>
        </li>
        <li>
          <Link href="/channels">
            <a>Channels</a>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Landing;
