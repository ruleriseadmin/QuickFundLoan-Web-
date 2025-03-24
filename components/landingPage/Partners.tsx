import Image from 'next/image';

const Partners = () => {
 
  return (
    <>
      <div className='w-11/12 h-auto mt-28 mx-auto rounded-[44px] text-center overflow-hidden font-outfit'>
        <p className='leading-none text-[#282828] lg:text-[58px] text-[50px] font-bold mb-10'>
          Our Partners
        </p>
        <div className='grid grid-cols-1 lg:grid-cols-4 md:grid-cols-4 w-10/12 gap-4 lg:gap-0 md:gap-0  justify-center align-middle mx-auto'>
          <div className='flex justify-center items-center'>
            <Image
              src='/images/interswitch.png'
              alt='card-image-1'
              width={223}
              height={76}
              className='object-cover'
            />
          </div>
          <div className='flex justify-center items-center'>
            <Image
              src='/images/central.png'
              alt='card-image-2'
              width={217}
              height={49}
              className='object-cover'
            />
          </div>
          <div className='flex justify-center items-center'>
            <Image
              src='/images/crc.png'
              alt='card-image-3'
              width={222}
              height={39}
              className='object-cover md: ml-8 mr-6 lg:mr-0 md:mr-0'
            />
          </div>
          <div className='flex justify-center items-center'>
            <Image
              src='/images/paystack.png'
              alt='card-image-4'
              width={223}
              height={123.72}
              className='object-cover lg:ml-10 md:ml-16'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Partners;
