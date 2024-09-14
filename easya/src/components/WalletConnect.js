// src/WalletConnect.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context';
import Connex from '@vechain/connex';

const WalletConnect = () => {
  const [connex, setConnex] = useState(null);
  const [vendor, setVendor] = useState(null);
  const { wallet_id, set_wallet_id } = useAuth();

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
          set_wallet_id(r.annex.signer);
        })
        .catch((error) => {
          console.error('Error connecting wallet:', error);
          set_wallet_id(null);
        });
    }
  };

  return (
    <div>
      <button onClick={handleConnectWallet}>
        {wallet_id ? 'Wallet Connected' : 'Connect Wallet'}
      </button>
    </div>
  );
};

export default WalletConnect;
