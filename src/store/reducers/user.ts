import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../types";

interface UserType {
    jwtToken: string;
    email: string;
    name: string;
    phone: string;
}

const userReducer = (state = {}, action: {type: string; payload: UserType}) => {
    switch (action?.type) {
        case SET_CURRENT_USER:
            localStorage.setItem('currentUser', JSON.stringify(action?.payload));
            return action?.payload;
        case CLEAR_CURRENT_USER:
            localStorage.removeItem('currentUser');
            return null;
        default:
            const storedUser = localStorage.getItem('currentUser');
            if (typeof storedUser === 'string'){
                return JSON.parse(storedUser);
            }
            return null;
            
    }
}

export default userReducer;