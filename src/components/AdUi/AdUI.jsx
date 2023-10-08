import React, { useEffect, useState } from 'react';
import { Carousel, Col, Container, Row } from 'react-bootstrap';
import './AdUI.scss';
import { getAds } from '../../api/ad';

export const AdCarousel = () => {

    const [adProducts, setAdProducts] = useState();

    const fetchAds = () => {
        // setLoading(true);
        getAds()
            .then((data) => {
                setAdProducts([...data]);
                console.log(adProducts)
            })
            .catch((error) => {
                console.error('Error:', error);
            })
            .finally(() => {
                // setLoading(false);

            });
    };

    useEffect(() => {
        fetchAds();
    },[]);

    return (
        <Carousel data-bs-theme="dark" interval={1000} className='carousel-index mb-5'>
            {adProducts && adProducts.map((product) => (
                <Carousel.Item key={product.id}>
                    <img
                        className="d-block p-0 w-100 img-fluid"
                        src={`${process.env.REACT_APP_BACKEND_URL}/${product.image_url}`}
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