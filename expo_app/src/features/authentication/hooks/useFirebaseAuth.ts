import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import { AUTHENTICATION } from "@/utils/firebase/firebaseConfig";

export const useFirebaseAuth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(AUTHENTICATION, async (user) => {
      user ? setUser(user) : setUser(null);
    });

    return () => unsubscribe();
  }, []);

  return user;
};
