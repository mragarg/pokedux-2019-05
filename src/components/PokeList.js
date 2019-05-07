import React from 'react'

function PokeList(props) {

    const cardItems = cards.map(card => {
        return <li>{card.name}</li>
    });

    return (
        <ul>
            {cardItems}
        </ul>
    );
}

export default PokeList;