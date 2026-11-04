import React from 'react';

export default function Navbar({ brand, page, onNavigate }) {
  const links = ['home', 'about', 'contact'];

  return (
    <header className="navbar">
      <div className="logo">{brand}</div>
      <nav>
        {links.map((item) => (
          <a
            key={item}
            href={`#${item}`}
            className={page === item ? 'active' : ''}
            onClick={() => onNavigate(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </a>
        ))}
      </nav>
    </header>
  );
}
