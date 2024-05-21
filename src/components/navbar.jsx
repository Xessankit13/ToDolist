import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-blue-600 py-2 text-white">
  <div className="logo ml-6">
    <span className="font-semibold">TaskManger</span>
  </div>
  <ul className="mr-6 flex gap-3">
    <li className="cursor-pointer hover:font-semibold">Home</li>
    <li className="cursor-pointer hover:font-semibold">Your Tasks</li>
  </ul>
</nav>
  );
};

export default Navbar;
