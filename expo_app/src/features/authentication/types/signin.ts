type Email = {
  method: "email";
  email: string;
  password: string;
};

type Google = {
  method: "google";
};

export type SignIn = Email | Google;

export const isEmail = (obj: SignIn): obj is Email => {
  return (
    obj.method === "email" &&
    typeof obj.email === "string" &&
    typeof obj.password === "string"
  );
};
