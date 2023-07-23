// interfaces.d.ts (or any .d.ts file)
import { Session } from "next-auth";

interface UserSession {
  user: {
    _id: string; // Assuming _id is of type string in your MongoDB schema
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    // Add any other properties you may have in the user object.
  };
}
