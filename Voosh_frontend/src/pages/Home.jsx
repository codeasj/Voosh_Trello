import React, { useState } from "react";
import SignUp from "../components/SignUp";

export default function Home() {
  const [show, setShow] = useState(false);

  return (
    <div>
      Home
      {true && <SignUp show={show} setShow={setShow} />}
    </div>
  );
}
