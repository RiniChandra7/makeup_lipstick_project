import '../App.css';
import ImageCarousel from './image-carousel.component';
import NeonHeading from './neon-heading.component';

function Home() {
  const imgs = [
    process.env.PUBLIC_URL + 'lipstick_1.jpg',
    process.env.PUBLIC_URL + 'lipstick_2.jpg',
    process.env.PUBLIC_URL + 'lipstick_3.jpg'
  ];

  return (
    <div className="App">
        <NeonHeading heading={"Lipcolor Engine"} />
        <div>
          <ImageCarousel images={imgs} />
        </div>
    </div>
  );
}

export default Home;
