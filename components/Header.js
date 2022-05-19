import { useEffect, useState } from "react";

const navigation = [
  { name: "Mint", href: "#" },
  { name: "FAQ", href: "#" },
  { name: "About Us", href: "#" },
  { name: "Roadmap", href: "#" },
];

export default function Header({ switchNetwork }) {
  const [currentAccount, setCurrentAccount] = useState("");

  const [headerColor, setHeaderColor] = useState("transparent")

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const accounts = await ethereum.request({ method: "eth_accounts" });
    if ( accounts != '') {
      setCurrentAccount(accounts[0]);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert('Please install metamask');

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      switchNetwork()

    } catch (error) {
      console.log(error);
    }
  };

  const shortenAddress = (address) => {
    let returnAddress = '';
    returnAddress = address.slice(0, 6) + '...' + address.slice(-4)
    return returnAddress;
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const listenScrollEvent = () => {
    window.scrollY > 20
      ? setHeaderColor("green")
      : setHeaderColor("transparent")
  }
  
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent)
  })

  return (
    <header className="fixed w-full z-10 top-0"  style={{backgroundColor: headerColor}}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-green-500 lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <h1 className="font-pumpkin text-white text-4xl">Web3</h1>
            </a>
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-white hover:text-green-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {currentAccount === "" ? (
              <button
                className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-gray-500 hover:bg-green-50"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            ) : (
              <span className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-gray-500 hover:bg-green-50">
                { shortenAddress(currentAccount) }
              </span>
            )}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-green-50"
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
