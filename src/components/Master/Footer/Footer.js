import React from 'react';
import Link from 'next/link';
import { imgPath } from '../../../const/alert';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <div className="footer">
    <Container>
      <div className="landingTop">
        <div className="branding__landingTop">
          <div className="imgWrap branding">
            <Link href='/'>
              <a>
                <img src={imgPath.logow} alt="_logo" />
              </a>
            </Link>
          </div>
        </div>
        <div className="contact__landingTop">
          <ul>
            <li>
              Contact
            </li>
            <li>
              <Link href="/">
                <a>1900 6710</a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>help@leflair.com</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="landingBot">
        <ul>
          <li className="gov-validate">
            <div className="imgWrap branding">
              <a href="http://www.online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=19306">
                <img src={imgPath.botImg} alt="_botImg" />
              </a>
            </div>
            <p>Copyright @ 2019 leflair.vn</p>
          </li>
          <li>Công ty Cổ phần Leflair - Tầng 16, Tháp A2, Tòa nhà Viettel, 285 Cách Mạng Tháng Tám, P.12, Q.10, TP.HCM</li>
          <li>Cơ quan cấp: Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh</li>
        </ul>
      </div>
    </Container>
  </div>
);

export default Footer;
