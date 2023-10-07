import React from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import './AdUI.scss';

const adProducts = [
    {
        id: 1,
        name: 'Product 1',
        image_url: `${process.env.REACT_APP_BACKEND_URL}/static/303647e4-23f3-4682-8821-36a4dae416a9.webp`,
        ad_title: 'Ad Title 1',
        ad_sub_title: 'Ad Subtitle 1',
    },
    {
        id: 2,
        name: 'Product 2',
        image_url: `${process.env.REACT_APP_BACKEND_URL}/static/540df82d-e520-4801-85a5-bfa61aecbd03.webp`,
        ad_title: 'Ad Title 2',
        ad_sub_title: 'Ad Subtitle 2',
    },
    {
        id: 3,
        name: 'Product 3',
        image_url: `${process.env.REACT_APP_BACKEND_URL}/static/e225d917-e163-44eb-8402-6496cc07faf4.webp`,
        ad_title: 'Ad Title 3',
        ad_sub_title: 'Ad Subtitle 3',
    },
    {
        id: 4,
        name: 'Product4',
        image_url: `${process.env.REACT_APP_BACKEND_URL}/static/30c6a66c-f47f-42d6-ae44-b28885c0b609.webp`,

        ad_title: 'Ad Title4',
        ad_sub_title: 'Ad Subtitle 4',
    },
    {
        id: 5,
        name: 'Product4',
        image_url: `${process.env.REACT_APP_BACKEND_URL}/static/0b46982d-79fc-4dfa-bc2d-498c755af365.webp`,

        ad_title: 'Ad Title4',
        ad_sub_title: 'Ad Subtitle 4',
    },
    // Add more products as needed
];

export const AdCarousel = () => {

    return (
        <Carousel data-bs-theme="dark" interval={1000} className='carousel-index mb-5' controls={false}>
            {adProducts.map((product) => (
                <Carousel.Item key={product.id}>
                    <img
                        className="d-block p-0 w-100 img-fluid"
                        src={product.image_url}
                        alt={product.name}
                    />
                    {/* <Carousel.Caption>
                        <h3>{product.ad_title}</h3>
                        <p>{product.ad_sub_title}</p>
                    </Carousel.Caption> */}
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