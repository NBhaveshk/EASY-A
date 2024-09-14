import React, { useContext, useState } from 'react';

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export default function Context({ children }) {
    const [wallet_id, set_wallet_id] = useState(null);

    return (
        <AuthContext.Provider value={{ wallet_id, set_wallet_id }}>
            {children}
        </AuthContext.Provider>
    );
}