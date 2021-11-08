import React from "react";
import Link from "next/link";

function PageNotFound() {
  return (
    <div>
      <h1>404! :(</h1>
      <h1>
        <Link href="/">
          <a>Home</a>
        </Link>
      </h1>
    </div>
  );
}

export default PageNotFound;
