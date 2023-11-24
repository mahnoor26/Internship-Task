import React, { createContext, useState } from 'react'

const initialState = {

};

export const AuthContext = createContext(initialState);


function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    const logout = () => {

    }

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;