import {type StateCreator} from "zustand";  


interface User {
    id: number;
    name: string;
    age: number;
}

interface UserStore {
    users: User[];
    addUser: (user: User) => void;
}

const Userstore: StateCreator<UserStore>  = (set) => ({
    users: [],
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
});


export default Userstore;   