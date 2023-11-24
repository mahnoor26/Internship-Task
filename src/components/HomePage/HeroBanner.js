import React, { useContext } from "react";
import { UIContext } from "../../context/uiContext";
import HeroSlider from "hero-slider/dist/HeroSlider";
import { Slide } from "hero-slider";
import BannerImage1 from "../../assets/images/bannerImage1.jpg";
import BannerImage2 from "../../assets/images/bannerImage2.jpg";


function HeroBanner() {
  const { handleSignupModal } = useContext(UIContext);

  return (
    <>
      <div className="container px-2 py-3 rounded">
        {/* <div className="container bg-primary p-5 my-4 background-gradient-home ">
          <div className="row align-items-center gx-5">
            <div className="col-md-5">
              <h1>Mentorship Matters: Guiding Others to Prosperity</h1>
              <p>
                "Unlock the doors of opportunity by sharing your passion and
                wisdom."
              </p>
              <button
                type="button"
                className="btn btn-primary px-4 py-2 rounded-pill fw-semibold"
                onClick={() => handleSignupModal(true)}
                style={{ backgroundColor: "#051d40" }}
              >
                Become a Mentor
              </button >
            </div >
            <div className="col-md-7" >
              <img src={HeroBannerImage} className="img-fluid" alt="Mentorship" />
            </div >
          </div >
        </div > */}
        <HeroSlider
          slidingAnimation="left_to_right"
          orientation="horizontal"
          initialSlide={1}
          style={{ backgroundColor: "rgba(0,0,0,0.3)", maxHeight: "80vh"}}
          autoplay={{
            autoplayDuration: 5000,
            autoplayDebounce: 0
          }}
          settings={{
            // slidingDuration: 250,
            // slidingDelay: 100,
            // shouldAutoplay: true,
            // shouldDisplayButtons: true,
            // autoplayDuration: 1000
            // height: "50vh", // Change the height value to adjust slide height
          }}
        >
          <Slide className="h-50">
            <img src={BannerImage1} className="img-fluid " alt="Mentorship" />
          </Slide>
          <Slide>
            <img src={BannerImage2} className="img-fluid" alt="Mentorship" />
          </Slide>
        </HeroSlider>
      </div>
    </>
  );
}

export default HeroBanner;
