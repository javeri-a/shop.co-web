import Brands from "./brands/page";
import Hero from "./heroSec/page";
import Arrival from "./newarrival/page";
import NewsLetter from "./newsletter/page";

import TestimonialsCarousel from "./reviews/page";
import Style from "./style/page";
import TopSelling from "./topselling/page";


export default function Home() {
  return(
    <div>
      <Hero/>
      <Brands/>
      <Arrival/>
      <TopSelling/>
  
      <Style/>
      <TestimonialsCarousel/>
      <NewsLetter/>

    </div>
  )
}