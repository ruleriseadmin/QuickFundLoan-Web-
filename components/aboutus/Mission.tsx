import Image from "next/image";

const Mission = () => {
  return (
    <div className="font-outfit w-11/12 h-auto mx-auto mt-20 flex flex-col-reverse lg:flex-row md:flex-row lg:gap-6 gap-6 md:gap-2">
      {/* Text container */}
      <div className="w-full lg:w-7/12 h-full px-2 lg:px-10 md:px-2 ">
        <p className="bg-gradient6 bg-clip-text text-transparent text-center lg:text-start md:text-start lg:text-[50px] md:text-[50px] text-[40px] font-extrabold mb-3">
          Our mission
        </p>
        <p className="text-[24px] text-center lg:text-start md:text-start md:text-[20px] mb-7">
        At Quickfund, we offer fast, reliable, and accessible loan solutions for both 
        individuals and businesses. Whether you need a personal loan to manage emergencies 
        or a business loan to scale your enterprise, Quickfund is here to bridge the financial gap.

        
        </p>
        <p className="text-[24px] md:text-[20px] text-center lg:text-start md:text-start">
        Our mission is to empower individuals and businesses by providing 
        seamless access to loans that fuel growth, stability, and success. We strive to simplify 
        the borrowing experience with financial solutions that are fast, dependable, and user-friendly.
        </p>
      </div>

      {/* Image container */}
      <div className="w-full lg:w-5/12 md:w-full min-h-[300px] md:h-auto flex relative ">
  <div className="w-full h-full absolute">
    <Image
      src="/images/mission.png"
      alt="mission-image"
      fill
      className="object-fill rounded-[22px]"
    />
  </div>
</div>

    </div>
  );
};

export default Mission;
