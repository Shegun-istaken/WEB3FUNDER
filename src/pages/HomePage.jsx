import web3funder from "../assets/images/web3funder.svg";
import menu from "../assets/images/ham.svg";
import x from "../assets/images/x.svg";

function SideNav (){
    return(
        <nav>
            <img src={x} alt="exit icon" />
            <button>Connect your wallet</button>
          <button>Start a GoFundMe</button>
        </nav>
    )
}

function HomePage() {
  return (
    <div>
      <header>
        <nav>
          <div className="divImage">
            <img src={web3funder} alt="web3funder logo" />
          </div>
          <div className="header-input">
            <input placeholder="Find a Web3Funder Campaign" />
            <svg
              className="search"
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              viewBox="0 0 100 100"
            >
              <path d="M39.8 41.95 26.65 28.8q-1.5 1.3-3.5 2.025-2 .725-4.25.725-5.4 0-9.15-3.75T6 18.75q0-5.3 3.75-9.05 3.75-3.75 9.1-3.75 5.3 0 9.025 3.75 3.725 3.75 3.725 9.05 0 2.15-.7 4.15-.7 2-2.1 3.75L42 39.75Zm-20.95-13.4q4.05 0 6.9-2.875Q28.6 22.8 28.6 18.75t-2.85-6.925Q22.9 8.95 18.85 8.95q-4.1 0-6.975 2.875T9 18.75q0 4.05 2.875 6.925t6.975 2.875Z" />
            </svg>
          </div>
          <button>Connect your wallet</button>
          <button>Start a GoFundMe</button>
          <img
            src={menu}
            alt="menu icon"
            onClick={() => {
              console.log("test");
            }}
            className="menu"
          />
        </nav>
        <div className="header-content">
          <div className="title">
            <h1>Your Home for Help</h1>
          </div>
          <button>Start a Crowdfunding Campaign</button>
          <button>Contribute </button>
        </div>
      </header>
      <main></main>
    </div>
  );
}

export default HomePage;
