import React from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards() {
    return (
        <div className='cards'>
            <h1>Check out these EPIC destinations!</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <CardItem 
                        src="images/img-10.jpg"
                        text="Explore the hidden waterfall deep inside the Amazon rainforest"
                        label='Adventure'
                        path='/services'
                        />
                         <CardItem 
                        src="images/img-11.jpg"
                        text="Travel throigh the islands of Bali in a Private Cruise"
                        label='Luxury'
                        path='/services'
                        />
                    </ul>
                    <ul className="cards__items">
                        <CardItem 
                        src="images/img-12.jpg"
                        text="Explore the hidden waterfall deep inside the Amazon rainforest"
                        label='Adventure'
                        path='/services'
                        />
                         <CardItem 
                        src="images/img-13.jpg"
                        text="Travel throigh the islands of Bali in a Private Cruise"
                        label='Luxury'
                        path='/services'
                        />
                         <CardItem 
                        src="images/img-14.jpg"
                        text="Travel throigh the islands of Bali in a Private Cruise"
                        label='Luxury'
                        path='/services'
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Cards;
