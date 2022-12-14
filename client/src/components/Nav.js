import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authentication/authSlice'
import auction from "../asset/auction.svg";

const Nav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state ) => state.auth);

    // const [notification, setNotification ] = useState('');

      //Listens after a product is added
    // useEffect(() => {
    //   socket.on('addProductResponse', (data) => {
    //     setNotification(
    //       `@${data.owner} just added ${data.name} worth $${Number(
    //         data.price
    //       ).toLocaleString()}`
    //     );
    //   });
    //   }, [socket]);

      //Listens after a user places a bid
    // useEffect(() => {
    //   socket.on('bidProductResponse', (data) => {
    //   setNotification(
    //       `@${data.last_bidder} just bid ${data.name} for $${Number(
    //         data.amount
    //       ).toLocaleString()}`
    //     );
    //   });
    // }, [socket]);

    const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/login')
    }
    return (
      <header className='header'>
        <div className='logo'>
          <img src={auction}  width="25px" height="25px" alt='auc' title='Auction Bidding' />
        </div>

        <ul>
          {user ? (
            <li>
              <button  className="btn" onClick={onLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to='/login'>
                  <FaSignInAlt /> Login
                </Link>
              </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
            {/* <li>
              <div>
                <p style={{ color: 'red'}}>{notification}</p>
              </div>
            </li> */}
            </>
          )}
        </ul>
    </header>
  )
}

export default Nav