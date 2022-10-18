import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from '../../assets/icons/arrow-back-circle-outline.svg';

function ErrorPage() {
  return (
    <main className="unknown-page page">
      <h2>Unknown Page</h2>
      <p className="description">Sorry that page doesn't exist...</p>
      <Link className="shop-link" to="/shop">
        <ArrowLeft width="24px" />
        To Store
      </Link>
    </main>
  );
}

export default ErrorPage;
