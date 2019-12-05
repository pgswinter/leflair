import React from 'react';
import Link from 'next/link';
import { imgPath } from '../../../const/alert';
import { Container } from 'react-bootstrap';

const handleModal = (props) => {
  props.openModal()
}

const Header = (props) => {
  return (
    <div className="header">

      <div className="navbar__header">
        <Container>
          <div className="logo__navbar ">
            <div className="imgWrap branding">
              <Link href='/'>
                <a>
                  <img src={imgPath.logo} alt="_logo" />
                </a>
              </Link>
            </div>
          </div>
          <div className="icon__navbar">
            <button className="btn btn-icon" onClick={() => handleModal(props)}>
              <i className="fas fa-shopping-cart"></i>
            </button>
          </div>
        </Container>
      </div>

      <div className="menu-bar__header">
        <Container>
          <ul>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>About</a>
              </Link>
            </li>
          </ul>
        </Container>
      </div>

    </div>
  );
}

export default Header;
