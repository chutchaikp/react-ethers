import { useState } from 'react';

import './sendETH.scss';
import { ethers } from 'ethers';

function SendETH() {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    try {
      debugger;
      e.preventDefault();
      setError('');

      if (!window.ethereum) {
        setError('No crypto wallet found. Please install it.');
        return;
      }
      const data = new FormData(e.target);
      const _to = data.get('to');
      const _amount = data.get('amount');

      // connect to crypto wallet
      await window.ethereum.send('eth_requestAccounts');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // if check is address or not
      const isAddress = ethers.utils.isAddress(_to);
      if (!isAddress) {
        setError('Invalid Address!');
        return;
      }

      // ***** if send ETH // do transaction
      const tx = await signer.sendTransaction({
        to: _to,
        value: ethers.utils.parseEther(_amount),
      });

      debugger;
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="sendETH">
      <form className="card" onSubmit={handleSubmit}>
        <h3>Send ETH payment</h3>
        <input type="text" name="to" />
        <input type="text" name="amount" />
        <input type="submit" value="PAY NOW" />

        {error && error.length > 0 && <div className="error">{error}</div>}
      </form>
    </div>
  );
}

export default SendETH;
