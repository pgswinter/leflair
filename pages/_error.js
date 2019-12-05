import React from 'react';
import { imgPath } from '../src/const/alert';
import { Container } from 'react-bootstrap';
import Link from 'next/link';


class Page extends React.Component {
    static async getInitialProps() {
    }
    render() {

        return (
            <Container>
                <Link href="/">
                    <a>
                        <img src={imgPath.errorpage} className="img_tabino_404" alt="IMG 404" />
                    </a>
                </Link>
            </Container>
        );
    }
}

export default Page;
