// import { useEffect, useState } from "react";
// import { createContext } from "react";

// export const UserContext = createContext({
//     currentUser: null,
//     setCurrentUser: () => null
// });



// export const UserProvider = ({children}) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const value = { currentUser, setCurrentUser };
//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
// }
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  // Initialize the user state with the data from local storage
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const value = { currentUser, setCurrentUser };

  // Save the user data to local storage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [currentUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
