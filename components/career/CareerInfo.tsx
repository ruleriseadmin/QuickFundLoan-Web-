import React from 'react'
import Image from 'next/image'

const CareerInfo = () => {
    const data = [
        {
            image: '/images/hearts.png',
            title: 'Healthy work-life balance',
            description: 'At QuickCred, our work schedules incorporate quality work ethics, fun and productivity. Ours is a wholesome work environment that promotes a balance of workflow, happiness, performance and profit among employees.'
        },
        {
            image: '/images/flexible.png',
            title: 'Flexible work schedule',
            description: 'Our work schedule system prioritizes people and productivity. We allow for an alternative to the conventional workweek. Some of our employees are allowed to start and end a work day earlier than the scheduled time when work situation demands.'
        },
        {
            image: '/images/bonding.png',
            title: 'Team bonding',
            description: 'As an ambitious organization, our human resources principle is premised on work, play and effective team building. For this reason, on an annual basis, we organize team retreat and staff gathering designed to combine work, fun, team bonding.'
        }
    ]
  return (
    <div className='my-10 font-outfit'>
        <h1 className='text-[46px] font-bold text-center text-[#282828]'>Some of the perks we enjoy</h1>
        <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-10/12 mx-auto'>
            {data.map((item, index) => (
                <div key={index} className='bg-[#F3F6F8] w-full rounded-[12px] px-6 pt-8 pb-8 min-h-[226px] h-auto'>
                    <div className='flex justify-start items-center gap-2 mb-4  '>
                        <Image 
                        src={item.image} 
                        width={35} 
                        height={35} 
                        alt='icon' />
                        <p className='text-[#282828] text-center font-medium text-[23px] md:text-[18px] lg:text-[23px]'>{item.title}</p>

                    </div>
                    
                    <p className='text-[#282828] text-start text-[16px] font-normal'>{item.description}</p>
                </div>
            ))

                }

        </div>

    </div>
  )
}

export default CareerInfo