import {
  CustomerReviews,
  PopularProducts,
  Services,
  SpecialOffer,
  SuperQuality,
} from "@/components/sections";
import Hero from "@/components/sections/Hero";

const App = () => (
  <div className="">
    <section className="xl:padding-l wide:padding-r padding-b">
      <Hero />
    </section>
    <section className="padding">
      <PopularProducts />
    </section>
    <section className="padding">
      <SuperQuality />
    </section>
    <section className="padding-x py-10">
      <Services />
    </section>
    <section className="padding">
      <SpecialOffer />
    </section>
    <section className="bg-pale-blue padding">
      <CustomerReviews />
    </section>
  </div>
);

export default App;
