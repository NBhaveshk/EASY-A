// src/WalletConnect.js
import React, { useState, useEffect, useCallback } from 'react';
import Connex from '@vechain/connex';

const WalletConnect = () => {
  const [connex, setConnex] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    // Initialize Connex
    const connexInstance = new Connex({
      node: 'https://testnet.veblocks.net/', // Replace with the actual node URL if needed
      network: 'test',
    });
    setConnex(connexInstance);
    setVendor(new Connex.Vendor('test'));
  }, []);

  const handleConnectWallet = () => {
    if (vendor) {
      vendor
        .sign('cert', {
          purpose: 'identification',
          payload: {
            type: 'text',
            content: 'Connect your wallet to log in',
          },
        })
        .request()
        .then((r) => {
          console.log('Wallet connected:', r.annex.signer);
          setWalletConnected(true);
        })
        .catch((error) => {
          console.error('Error connecting wallet:', error);
          setWalletConnected(false);
        });
    }
  };

  return (
    <div>
      <button onClick={handleConnectWallet}>
        {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletConnect;
