import React from 'react'
import { Link } from 'react-router-dom';
import './homePage.css';

function HomePage() {
  return (
    <section className='home page'>
      <Link className='btn-style ' to='/shop'>
        <div>shop</div>
      </Link>
    </section>
  )
}

export default HomePage