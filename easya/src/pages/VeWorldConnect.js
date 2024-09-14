// src/VeWorldConnect.js
import React, { useState } from 'react';
import WebView from 'react-webview';

const VeWorldConnect = () => {
  const [connected, setConnected] = useState(false);

  const handleWebViewMessage = (event) => {
    const message = event.nativeEvent.data;
    if (message === 'connected') {
      setConnected(true);
    }
  };

  return (
    <div>
      {connected ? (
        <p>Wallet Connected!</p>
      ) : (
        <WebView
          source={{ uri: 'https://your-veworld-connection-url.com' }} // Replace with actual URL for VeWorld wallet connection
          style={{ height: '80vh', width: '100%' }}
          onMessage={handleWebViewMessage}
        />
      )}
    </div>
  );
};

export default VeWorldConnect;
