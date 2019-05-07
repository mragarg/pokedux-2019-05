import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';

// ====================================================
// STATE
import { createStore, combineReducers } from 'redux';
import initialCards from './base.json';
// console.log(initialState);

const VISIBILITY_ALL = 'all';
const VISIBILITY_CAUGHT = 'caught';
const VISIBILITY_UNCAUGHT = 'uncaught';

const initialState = {
    // cards: [],
    ...initialCards,   // This spreads the "cards": [...] into this spot in initialState
    // cards: initialCards.cards // This line is the equivalent of ...initialCards
    visibilityFilter: VISIBILITY_ALL
};

console.log(initialState);

// the state is an object
// with a cards property
// which is an array of objects
// { cards: [ {}, {}, {} ]}


// ====================================================
// ACTIONS + ACTION CREATORS
const ACTION_CATCH = 'catch';

function catchCard (id) {
    return {
        type: ACTION_CATCH,
        payload: {
            id,
        }
    }
}
window.catchCard = catchCard;

const ACTION_VISIBILITY_ALL = VISIBILITY_ALL;
const ACTION_VISIBILITY_CAUGHT = VISIBILITY_CAUGHT;
const ACTION_VISIBILITY_UNCAUGHT = VISIBILITY_UNCAUGHT;

function setVisibilityAll() {
    return {
        type: ACTION_VISIBILITY_ALL
    };
}

function setVisibilityCaught() {
    return {
        type: ACTION_VISIBILITY_CAUGHT
    };
}

function setVisibilityUncaught() {
    return {
        type: ACTION_VISIBILITY_UNCAUGHT
    };
}
window.setVisibilityAll = setVisibilityAll;
window.setVisibilityCaught = setVisibilityCaught;
window.setVisibilityUncaught = setVisibilityUncaught;

// ====================================================
// REDUCER

// cards reducer manages an array
function cards(state=initialState.cards, action={type: ''}) {
    console.log(`cards got called with ${action.payload}`);

    switch(action.type) {
        case ACTION_CATCH:
            console.log(`cards got called with ${action.payload.id}`);
            // find the card, set it to "caught"
            const newState = state.map(card => {
                    if (card.id === action.payload.id) {
                        console.log('found the card! yay!');
                        return {
                            ...card,
                            isCaught: true
                        }
                    } else {
                        return card;
                    }
                })
            ;
            // Whatever is returned by the reducer
            // is automatically used by the store as 
            // the new version of state.
            return newState;
        break;

        default:
            return state;
        break;
    }
}

// visibility reducer manages a string
function visibility(state=initialState.visibilityFilter, action={type: ''}) {
    switch(action.type) {
        case ACTION_VISIBILITY_ALL:            
            return VISIBILITY_ALL;
        break;
        case ACTION_VISIBILITY_CAUGHT:            
            return VISIBILITY_CAUGHT;
        break;
        case ACTION_VISIBILITY_UNCAUGHT:            
            return VISIBILITY_UNCAUGHT;
        break;
        default:
            return state;
        break;
    }
}

// This is where you are assigning responsibility
// of one piece of state
// to one reducer.
const rootReducer = combineReducers({
    cards: cards,
    visibilityFilter: visibility
});

// ====================================================
// STORE
const store = createStore(rootReducer);
window.store = store;

















ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
