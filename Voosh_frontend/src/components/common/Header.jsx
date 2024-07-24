import React from "react";
import Button from "./Button";

export default function Header() {
  return (
    <header>
      <nav className="flex items-center h-10 w-full justify-between bg-blue-500">
        <div>Image</div>
        <Button className="bg-red-500">Logout</Button>
      </nav>
    </header>
  );
}
