import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [userName, setUserName ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // localStorage.setItem('userName', userName);
        // navigate('/products');
        
        fetch("https://react-socket-demo-default-rtdb.firebaseio.com/auction.json",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username : userName}),
        }).then((Response) =>{
            if(Response.ok) {
                navigate('/products');
            }
        }).catch((error) => {
            console.log(error);
        })
    };

    return(
        <div>
            <form className='home__form' onSubmit={handleSubmit}>
                <label htmlFor='username'>Enter your username</label>
                <input 
                type="text"
                name="username"
                className="home__input"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                required
                minLength={6}
                />
                <button className='home_cta'>SIGN IN</button>
            </form>
        </div>
    );
}
export default Home;