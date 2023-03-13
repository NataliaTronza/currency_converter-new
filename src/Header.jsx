import React from 'react';

const Header = ({ rateUsd, rateEur }) => {
  return (
    <div className="header-wrapper">
      <div className="header-rate">
        USD <span>{rateUsd}</span>
      </div>
      <div className="header-rate">
        EUR <span>{rateEur}</span>
      </div>
    </div>
  );
};

export default Header;