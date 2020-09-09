

const initialState = {
    version: 1,
    speedValue: 0
};

const appByState = (state = initialState, action) => {

    switch (action.type) {

        case "updatePosition": {
            return {
                ...state, speedValue: action.value
            }
        }


        default:
            return state
    }
};

export default appByState
