import React from 'react';
import { Link } from 'react-router-dom';
import auctions64 from "../assest/auctions64.png";

const Nav = () => {
    return (
        <nav className='navbar'>
            <div className='header'>
                <Link to="/">
                    {/* <h2>Bid Items</h2> */}
                    <img src={auctions64} alt='auc' title='Auction Bidding' />
                </Link>
            </div>

            <div>
                <p style={{ color: 'red'}}>My notifications are here</p>
            </div>
        </nav>
    )
}

export default Nav