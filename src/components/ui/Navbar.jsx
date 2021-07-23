import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

const Navbar = () => {

    const {name} = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const handleLogut = () => {
        dispatch(startLogout())
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>

            <button 
                className="btn btn-outline-danger"
                onClick = {handleLogut}
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Exit</span>
            </button>
        </div>
    );
};

export default Navbar;