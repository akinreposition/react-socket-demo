import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [ userName, setUserName ] = useState('');
    const [ password, setPassword ] =useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('userName', userName);
        navigate('/products');
        
        // fetch("https://react-socket-demo-default-rtdb.firebaseio.com/auction.json",{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({username : userName, password}),
        // }).then((Response) =>{
        //     if(Response.ok) {
        //         navigate('/products');
        //     }
        // }).catch((error) => {
        //     console.log(error);
        // })
    };

    return(
        <div>
            <form className='home__form' onSubmit={handleSubmit}>
                <div>
                    {/* <label htmlFor='username: ' className='home_label'>Username</label> */}
                        <input 
                            type="text"
                            name="username"
                            className="home__input"
                            value={userName}
                            placeholder="User name"
                            onChange={e => setUserName(e.target.value)}
                            required
                            minLength={6}
                        />
                </div>

                <div>
                    {/* <label htmlFor='password: ' className='home_label'>Password</label> */}
                        <input 
                            type="text"
                            name="password"
                            className="home__input"
                            value={password}
                            placeholder="Password"
                            onChange={e => setPassword(e.target.value)}
                            required
                            minLength={8}
                        />
                </div>

                <button className='home__cta'>SIGN IN</button>
            </form>
        </div>
    );
}
export default Home;