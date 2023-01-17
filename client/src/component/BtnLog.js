import React from 'react';
import { Link } from 'react-router-dom';

const BtnLog = () => {
    return (

        <div className="container-btn hover">

            <Link to="/login" >
                <button className='buttons'>   Log In   </button>
            </Link>
            <Link to="/register" >
                <button className='buttons'>  Sign Up  </button>
            </Link>

        </div>

    );
};

export default BtnLog;