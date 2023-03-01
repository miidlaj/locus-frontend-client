import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../types";

interface UserType {
    jwtToken: string;
    email: string;
    name: string;
    phone: string;
    id: string;
}

export const setCurrentUser = (user: UserType) => {
    return{
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const clearCurrentUser = () => {
    return{
        type: CLEAR_CURRENT_USER,
    };
};