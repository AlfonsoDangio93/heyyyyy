import PressPanel from "@/components/home/PressPanel";

/** Fascia autonoma delle testate, subito sotto l'hero. */
const PressSection = () => (
  <section className="bg-press py-6 md:py-8">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <PressPanel className="border-transparent bg-transparent p-0 shadow-none md:px-0 md:py-0" />
    </div>
  </section>
);

export default PressSection;
