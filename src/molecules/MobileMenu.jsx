import ham from "../assets/images/ham.svg";
import x from "../assets/images/x.svg";
import { useState } from "react";

function MobileNav({ OnClick, classname }) {
  return (
    <nav id="mobile-nav-ul" className={classname}>
      {/* <img src={x} alt="x icon" onClick={OnClick} id="x" /> */}
      <ul>
          <button>Connect your wallet</button>
          <button>Start a GoFundMe</button>
      </ul>
    </nav>
  );
}

function MobileMenu() {
  const [nav, setNav] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e) {
    if (isOpen) {
      setNav("");
      setIsOpen(!isOpen);
    } else {
      setNav("active");
      setIsOpen(!isOpen);
    }
  }
  return (
    <>
      <button
        id="ham-button"
        name="ham"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <img src={ham} name="ham" alt="hamburger menu" id="hamburger" />
      </button>
      <MobileNav
        classname={`mobile-nav ${nav}`}
        OnClick={(e) => {
          handleClick(e);
        }}
      />
    </>
  );
}

export default MobileMenu;
