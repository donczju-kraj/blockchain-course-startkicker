import Web3 from "web3";

let web3: Web3;

const isMetaMaskRunningInBrowser = () => {
  return (typeof window !== "undefined" && typeof window.ethereum !== "undefined");
}

if (isMetaMaskRunningInBrowser()) {
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(String(process.env.PROVIDER_HTTP));
  web3 = new Web3(provider);
}
 
export default web3;