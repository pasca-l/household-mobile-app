import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { SignIn, isEmail } from "../types/signin";

import { AUTHENTICATION } from "@/utils/firebase/firebaseConfig";
import { GOOGLE_PROVIDER } from "@/utils/firebase/providers/authProviders";

export const signInFirebaseAuth = ({ ...args }: SignIn) => {
  if (isEmail(args)) {
    return signInWithEmailAndPassword(
      AUTHENTICATION,
      args.email,
      args.password
    );
  } else {
    switch (args.method) {
      case "google":
        return setPersistence(AUTHENTICATION, browserSessionPersistence).then(
          async () => {
            await signInWithPopup(AUTHENTICATION, GOOGLE_PROVIDER);
          }
        );
    }
  }
};

export const signOutFirebaseAuth = () => {
  return signOut(AUTHENTICATION);
};
