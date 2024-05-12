import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { AUTHENTICATION } from "@/utils/firebase/firebaseConfig";
import { GOOGLE_PROVIDER } from "@/utils/firebase/authentiation/authProviders";

type Email = {
  method: "email";
  email: string;
  password: string;
};

type Google = {
  method: "google";
};

type SignIn = Email | Google;

const isEmail = (obj: SignIn): obj is Email => {
  return (
    obj.method === "email" &&
    typeof obj.email === "string" &&
    typeof obj.password === "string"
  );
};

export const signInFirebaseAuth = ({ ...args }: SignIn) => {
  if (isEmail(args)) {
    return () => {
      signInWithEmailAndPassword(AUTHENTICATION, args.email, args.password);
    };
  } else {
    switch (args.method) {
      case "google":
        return () => {
          setPersistence(AUTHENTICATION, browserSessionPersistence).then(
            async () => {
              await signInWithPopup(AUTHENTICATION, GOOGLE_PROVIDER);
            }
          );
        };
    }
  }
};

export const signOutFirebaseAuth = () => {
  signOut(AUTHENTICATION);
};
