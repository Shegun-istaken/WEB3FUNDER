import web3funder from "../assets/images/web3funder.svg";

function HomePage() {
  return (
    <div>
      <header>
        <nav>
          <a href="../">Search</a>
          <a href="../">For Individuals</a>
          <a href="../">For Charities</a>
          <img src={web3funder} alt="web3funder logo" />
          <a href="../">How it Works</a>
          <a href="../">Sign In</a>
          <button>Start a GoFundMe</button>
        </nav>
        <div class="title">
          <h1>Your Home for Help</h1>
          <button>Start a GoFundMe</button>
        </div>
      </header>
      <main></main>
    </div>
  );
}

export default HomePage;

