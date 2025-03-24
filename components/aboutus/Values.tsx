import Image from "next/image"

const Values = () => {
  return (
    <>
      <div className="my-20">
        <p className="bg-gradient6 bg-clip-text text-transparent md:text-[50px] text-[45px] lg:text-[50px] font-extrabold mb-6 ml-10 md:ml-10 lg:ml-28">
          Our core values
        </p>
      </div>
      
      {/* Main grid container with margin-bottom to prevent overlap */}
      <div className='font-outfit w-10/12 lg:w-10/12 md:w-11/12  h-auto grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 mx-auto gap-8 lg:gap-6 md:gap-6 mb-20'> {/* Added mb-20 */}
        
        {/* First main grid */}
        <div className='block lg:flex md:flex justify-evenly w-full h-auto relative mb-6'>
          
        <div className="min-w-[140px] md:w-full h-[350px] w-[350px]  md:h-auto mx-auto lg:ml-0 md:ml-0 relative"> {/* Fixed height for the container */}
            <Image
                src="/images/excellence.png"
                alt='value-image'
                fill
                className='absolute rounded-[20px] object-cover md:object-fill lg:object-cover' // Image fills the container while maintaining aspect ratio
            />
            </div>

          
            <div className="px-4 w-full h-auto lg:mt-0 md:mt:0 mt-4 text-center lg:text-start md:text-start">
            <p className="text-navfont lg:text-[20px] text-[24px] md:text-[20px] font-bold mb-1 ">Excellence</p>
            <p className=" text-[17px] lg:text-[18px]  mb:text-[14px] text-[#5A5A5A]">
            We set high standards and consistently deliver exceptional financial products and services to meet your needs
            </p>
          </div>
        </div>
        
        {/* Second main grid - adjust height accordingly */}
        <div className='block lg:flex md:flex justify-evenly w-full h-auto relative mb-6'>
          
          <div className="min-w-[140px] md:w-full h-[350px] w-[350px]  md:h-auto mx-auto lg:ml-0 md:ml-0 relative"> {/* Fixed height for the container */}
              <Image
                  src="/images/innovation.png"
                  alt='value-image'
                  fill
                  className='absolute rounded-[20px] object-cover md:object-fill lg:object-cover' // Image fills the container while maintaining aspect ratio
              />
              </div>
  
            
              <div className="px-4 w-full h-auto lg:mt-0 md:mt:0 mt-4 text-center lg:text-start md:text-start">
              <p className="text-navfont lg:text-[20px] text-[24px] md:text-[20px] font-bold mb-1 ">Innovation</p>
              <p className=" text-[17px] lg:text-[18px]  mb:text-[14px] text-[#5A5A5A]"> 
              By embracing technology and forward-thinking solutions, we simplify the lending process, offering smarter, faster, and more accessible services.

              </p>
            </div>
          </div>

          <div className='block lg:flex md:flex justify-evenly w-full h-auto relative mb-6'>
          
          <div className="min-w-[140px] md:w-full h-[350px] w-[350px]  md:h-auto mx-auto lg:ml-0 md:ml-0 relative"> {/* Fixed height for the container */}
              <Image
                  src="/images/integrity.png"
                  alt='value-image'
                  fill
                  className='absolute rounded-[20px] object-cover md:object-fill lg:object-cover ' // Image fills the container while maintaining aspect ratio
              />
              </div>
  
            
              <div className="px-4 w-full h-auto lg:mt-0 md:mt:0 mt-4 text-center lg:text-start md:text-start">
              <p className="text-navfont lg:text-[20px] text-[24px] md:text-[20px] font-bold mb-1 ">Integrity</p>
              <p className=" text-[17px] lg:text-[18px]  mb:text-[14px] text-[#5A5A5A]">
              Trust is our greatest asset. We operate with honesty, transparency, and reliability, ensuring your confidence in our solutions.

              </p>
            </div>
          </div>
          <div className='block lg:flex md:flex justify-evenly w-full h-auto relative mb-6'>
          
          <div className="min-w-[140px] md:w-full h-[350px] w-[350px]  md:h-auto mx-auto lg:ml-0 md:ml-0 relative"> {/* Fixed height for the container */}
              <Image
                  src="/images/teamwork.png"
                  alt='value-image'
                  fill
                  className='absolute rounded-[20px] object-cover md:object-fill lg:object-cover' // Image fills the container while maintaining aspect ratio
              />
              </div>
  
            
              <div className="px-4 w-full h-auto lg:mt-0 md:mt:0 mt-4 text-center lg:text-start md:text-start">
              <p className="text-navfont lg:text-[20px] text-[24px] md:text-[20px] font-bold mb-1 ">Team work</p>
              <p className=" text-[17px] lg:text-[18px]  mb:text-[14px] text-[#5A5A5A]">
              Collaboration is our strength. We work together within our organization and with our customers to achieve shared success.
              </p>
            </div>
          </div>
          <div className='block lg:flex md:flex justify-evenly w-full h-auto relative mb-6'>
          
          <div className="min-w-[140px] md:w-full h-[350px] w-[350px]  md:h-auto mx-auto lg:ml-0 md:ml-0 relative"> {/* Fixed height for the container */}
              <Image
                  src="/images/customer_service.png"
                  alt='value-image'
                  fill
                  className='absolute rounded-[20px] object-cover md:object-fill lg:object-cover' // Image fills the container while maintaining aspect ratio
              />
              </div>
  
            
              <div className="px-4 w-full h-auto lg:mt-0 md:mt:0 mt-4 text-center lg:text-start md:text-start">
              <p className="text-navfont lg:text-[20px] text-[24px] md:text-[20px] font-bold mb-1 ">Excellent Customer Service</p>
              <p className=" text-[17px] lg:text-[18px]  mb:text-[14px] text-[#5A5A5A]">
              Our customers are at the center of everything we do. We listen, understand, and prioritize your needs, striving to exceed expectations.
              </p>
            </div>
          </div>
          <div className='block lg:flex md:flex justify-evenly w-full h-auto relative mb-6'>
          
          <div className="min-w-[140px] md:w-full h-[350px] w-[350px]  md:h-auto mx-auto lg:ml-0 md:ml-0 relative"> {/* Fixed height for the container */}
              <Image
                  src="/images/empowerment.png"
                  alt='value-image'
                  fill
                  className='absolute rounded-[20px] object-cover md:object-fill lg:object-cover ' // Image fills the container while maintaining aspect ratio
              />
              </div>
  
            
              <div className="px-4 w-full h-auto lg:mt-0 md:mt:0 mt-4 text-center lg:text-start md:text-start">
              <p className="text-navfont lg:text-[20px] text-[24px] md:text-[20px] font-bold mb-1 ">Empowerment</p>
              <p className=" text-[17px] lg:text-[18px]  mb:text-[14px] text-[#5A5A5A]">
              We believe in unlocking potential. By providing access to financial solutions, we empower individuals and businesses to achieve their dreams and goals.
              </p>
            </div>
          </div>
      </div>
    </>
  )
}

export default Values;
