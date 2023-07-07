import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './image-carousel.css';

const ImageCarousel = ({ images }) => {
  return (
    <div className='mt-8'>
        <Carousel interval={3000}
            pause={false}
            fade>
        {images.map((imageUrl, index) => (
            <Carousel.Item key={index}>
                    <img className="carousel-image" src={imageUrl} />
            </Carousel.Item>
        ))}
        </Carousel>
    </div>
  );
};

export default ImageCarousel;
