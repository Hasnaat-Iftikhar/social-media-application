import React from "react";

// Components
import Container from "./Container";

const Navbar = async () => {
  return (
    <header className="py-5 border-b border-[#f3f3f3]">
      <Container>
        <div className="flex justify-between items-center">
          <h1 className="text-black bg-primary text-base font-medium py-2 px-4 rounded-lg cursor-default">
            Social Media Application
          </h1>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
