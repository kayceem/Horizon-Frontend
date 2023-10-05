import React from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import './AdUI.scss';

const adProducts = [
    {
        id: 1,
        name: 'Product 1',
        image: 'https://via.placeholder.com/800',
        ad_title: 'Ad Title 1',
        ad_sub_title: 'Ad Subtitle 1',
    },
    {
        id: 2,
        name: 'Product 2',
        image: 'https://via.placeholder.com/800',
        ad_title: 'Ad Title 2',
        ad_sub_title: 'Ad Subtitle 2',
    },
    {
        id: 3,
        name: 'Product 3',
        image: 'https://via.placeholder.com/800',
        ad_title: 'Ad Title 3',
        ad_sub_title: 'Ad Subtitle 3',
    },
    {
        id: 4,
        name: 'Product4',
        image: 'https://via.placeholder.com/800',

        ad_title: 'Ad Title4',
        ad_sub_title: 'Ad Subtitle 4',
    },
    // Add more products as needed
];

export const AdCarousel = () => {

    return (
        <Carousel data-bs-theme="dark" interval={1000} className='carousel-index'>
            {adProducts.map((product) => (
                <Carousel.Item key={product.id}>
                    <img
                        className="d-block w-100"
                        src={product.image}
                        alt={product.name}
                    />
                    <Carousel.Caption>
                        <h3>{product.ad_title}</h3>
                        <p>{product.ad_sub_title}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};
export const AdHero = () => {
    return (
        <div className="bg-dark text-white py-5 m-5">
        <Container>
            <Row>
                <Col className='d-flex justify-content-center align-items-center flex-column'>
                    <h1>Ad Spot</h1>
                    <h3>Your Ad Here</h3>
                </Col>
            </Row>
        </Container>
        </div>
    );
};