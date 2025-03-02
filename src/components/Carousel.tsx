import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";

interface Slide {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  description: string;
  category: string;
}

interface CarouselProps {
  slides: Slide[];
  interval?: number;
  onChange?: (index: number) => void;
}

const CustomCarousel: React.FC<CarouselProps> = ({ slides, onChange }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-auto rounded-lg text-white">
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay
        infiniteLoop
        interval={2000}
        transitionTime={500}
        onChange={(index) => onChange && onChange(index)}
      >
        {slides.slice(6, 10).map((slide) => (
          <div
            onClick={() => navigate(`/products/${slide.id}`)}
            key={slide.id}
            className="relative cursor-pointer flex flex-col md:flex-row items-center justify-between bg-pink-100 p-8 rounded-lg shadow-lg"
          >
            <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={slide.thumbnail}
              alt={slide.title}
              className="w-[200px] h-auto object-contain"
              onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
            />
            </div>

            <div className="w-full md:w-2/3 text-center md:text-left px-6">
              <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-pink-700">
                {slide.title}
              </h2>

              <p className="text-lg text-pink-800 mt-4 leading-relaxed">
                {slide.description}
              </p>

              <div className="flex flex-col md:flex-row md:items-center gap-4 mt-4">
                <span className="bg-pink-500/90 px-3 py-1 text-sm text-white rounded">
                  {slide.category}
                </span>

                <button className="bg-pink-600 text-white text-lg font-semibold py-2 px-5 hover:bg-pink-700 transition-all">
                  Shop Now
                </button>
              </div>

              <p className="mt-4 text-pink-700 text-lg font-bold">${slide.price}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
