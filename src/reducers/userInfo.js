import db from '../utils/localstorage'

const init = {
    user:db.get('USER'),
    accessToken:db.get('ACCESS_TOKEN'),
    tokenType:db.get('TOKEN_TYPE'),
}
export default function (state = init, action) {
    let { type, data } = action;
    switch (type) {
        case "USER":
            return {
                ...state,
                ...data
            }
        default:
            return {
                ...state
            }
    }
}
