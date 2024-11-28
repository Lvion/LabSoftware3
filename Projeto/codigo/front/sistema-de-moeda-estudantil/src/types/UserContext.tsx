import { Student } from "./Student";
import { Enterprise } from "./Enterprise";

export interface UserContextProps {
    user: Student | Enterprise | null;
    setUser: (user: Student | Enterprise | null) => void;
}