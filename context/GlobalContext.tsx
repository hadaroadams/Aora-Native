import { getCurrentUser } from "@/lib/appwrite";
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  SetStateAction,
  Dispatch,
} from "react";
import { Button, View } from "react-native";

interface Context {
  isLoading: boolean;
  isLoggedIn: boolean;
  setisLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: React.Dispatch<any>;
  user: any;
}

const GlobalContext = createContext<Context | null>(null);

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const userReload = async () => {

    try {
      const user = await getCurrentUser();
      // console.log(user);
      if (!user) setisLoggedIn(false);
      else {
        setisLoggedIn(true);
        setUser(user);
      }
    } catch (error) {
      setisLoggedIn(false);
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    userReload();
    // console.log("hello1");
  }, []);
  // console.log(`userState:${isLoggedIn}`);
  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setisLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
