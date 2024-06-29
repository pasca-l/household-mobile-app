import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { SignIn, isEmail } from "../types/signin";

import { GOOGLE_PROVIDER } from "@/utils/firebase/authentiation/authProviders";
import { AUTHENTICATION } from "@/utils/firebase/firebaseConfig";

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
