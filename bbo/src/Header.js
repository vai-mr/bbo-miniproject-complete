import React, { useState } from 'react'
import './Header.css'
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import HeaderLogo from './bbo_headerLogo.jpeg'
import { Link, useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';


function Header({hideDiv}) {

    const [{basket, user, sword}, dispatch] = useStateValue();
    const [searchWord, setSearchWord] = useState();
    const history = useHistory();

    const addSearchWord = () => {
        dispatch({
            type: 'ADD_SEARCH_WORD',
            sword: searchWord,
        })
        history.push('/search');
    }

    //handle authentication of user
    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }

    return (
        <div className='header'>
            <Link to="/">
                <img src={HeaderLogo} alt="logo_img" className="header_logo"/>
            </Link>
            
            <div className="header_search">
            {!hideDiv && (
                <div className="header_search"><input className="header_searchInput" type="text" onChange={e =>setSearchWord(e.target.value)}/>
                <button className="search_button" onClick={addSearchWord} type='submit'> 
                    <SearchIcon className='header_searchIcon'/>
                </button></div>
            )}
            </div>
            

            <div className="header_nav">
                <Link  to={!user && '/login'}>
                    <div onClick={handleAuthentication} className = 'header_option'>
                        <span className = 'header_optionLineOne'>{user ? user.email : 'Hello Guest'}</span>
                        <span className = 'header_optonLineTwo'>{user ? 'Sign out' : 'Sign In'}</span>
                    </div>
                </Link>

                <Link to='/orders'>
                    <div className = 'header_option'>
                        <span className = 'header_optionLineOne'>Your</span>
                        <span className = 'header_optonLineTwo'>Orders</span>
                    </div>
                </Link>
                                
                <Link to="/checkout">
                    <div className='header_optionBasket'>
                        <ShoppingBasketIcon />
                        <span className="header_optionLineTwo header_basketCount">{basket?.length}</span>
                    </div>
                </Link>
            </div>
        </div>
        
    )
}

export default Header
