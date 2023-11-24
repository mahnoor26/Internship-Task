import React, { createContext, useState } from "react";

const initialState = {
    isLoginModalOpen: false,
    isSignupModalOpen: false,
    isSigninModalOpen: false,
    isSigninBtnsModalOpen: false,
};

export const UIContext = createContext(initialState);

function UIProvider({ children }) {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
    const [isSigninModalOpen, setIsSigninModalOpen] = useState(false);
    const [isSigninBtnsModalOpen, setIsSigninBtnsModalOpen] = useState(false);

    const handleLoginModal = (value = false) => {
        if (value) {
            setIsSignupModalOpen(false)
        }
        setIsLoginModalOpen(value);
    };
    
    const handleSigninModal = (value = false) => {
        if (value) {
            setIsSignupModalOpen(false)
        }
        setIsSigninModalOpen(value);
    };
    const handleSignupModal = (value = false) => {
        if (value) {                    
            setIsSigninModalOpen(false)
        }
        setIsSignupModalOpen(value);
    };

    const handleSigninBtnsModal = (value = false) => {
        if (value) {
            setIsSigninModalOpen(false)
        }
        setIsSigninBtnsModalOpen(value);
    };

    return (
        <UIContext.Provider
            value={{
                isLoginModalOpen,
                isSignupModalOpen,
                isSigninModalOpen,
                isSigninBtnsModalOpen,
                handleSigninBtnsModal,
                handleLoginModal,
                handleSignupModal,
                handleSigninModal
            }}
        >
            {children}
        </UIContext.Provider>
    );
}

export default UIProvider;
