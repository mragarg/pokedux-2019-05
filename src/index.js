import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ====================================================
// STATE
import { createStore } from 'redux';
import initialState from './base.json';
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


// ====================================================
// REDUCER

function cards(state=initialState, action={type: ''}) {
    console.log(`cards got called with ${action.payload}`);

    switch(action.type) {
        case ACTION_CATCH:
            console.log(`cards got called with ${action.payload.id}`);
            // find the card, set it to "caught"
            const newState = {
                cards: state.cards.map(card => {
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
            };
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


// ====================================================
// STORE
const store = createStore(cards);
window.store = store;

















ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
