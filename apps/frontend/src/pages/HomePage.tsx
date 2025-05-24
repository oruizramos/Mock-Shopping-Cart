import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/assets/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay layout (constrained like NavBar & ShopPage) */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex-grow flex flex-col justify-center items-center text-white text-center">
          <main>
            <h1 className="text-4xl font-bold mb-4">Welcome to the Shopping App</h1>
            <p className="text-lg max-w-xl">
              Explore our curated selection of products and enjoy a seamless shopping experience.
            </p>
          </main>
        </div>

        <footer className="relative z-10 text-white text-sm text-center pb-6">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            Powered by{" "}
            <a
              href="https://fakestoreapi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-200"
            >
              FakeStore API
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
