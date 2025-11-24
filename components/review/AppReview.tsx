import React from 'react'
import Image from 'next/image'

const AppReview = () => {
    const dummyReview = [
        {
            name: "Adebayo Oluyemi",
            review: "Using Quickfund was a great experience! The loan application was simple, and I got my funds within minutes without any hassle. I loved that no collateral was required.",
            image: "revImage",
            rating: 5
        },
        {
            name: "Chioma Nwachukwu",
            review: "Very fast and reliable. I got the loan instantly and the repayment process is smooth.",
            image: "revImage",
            rating: 4
        },
        {
            name: "John Adekunle",
            review: "Quickfund saved me during an emergency. Super easy app to use.",
            image: "revImage",
            rating: 5
        },
        {
            name: "Blessing Okoro",
            review: "Customer service was very responsive. Had a great experience overall.",
            image: "revImage",
            rating: 5
        },
        {
            name: "Emmanuel Udo",
            review: "Loan approval was quick, but interest rate was very reasonable too.",
            image: "revImage",
            rating: 5
        },
        {
            name: "Fatima Musa",
            review: "Best loan app so far. No issues at all, and the interface is easy to navigate.",
            image: "revImage",
            rating: 5
        },
        {
            name: "Kunle Taiwo",
            review: "Easy process from start to finish. I will definitely recommend!",
            image: "revImage",
            rating: 4
        },
        {
            name: "Sarah Adeoye",
            review: "Quickfund is reliable. I’ve used it twice and never had any issues.",
            image: "revImage",
            rating: 5
        },
    ];

    return (
        <div className='lg:w-10/12 md:w-10/12 w-11/12 mx-auto grid mt-20 lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6'>
            {dummyReview.map((item, index) => (
                <div key={index} className='border border-solid p-4 shadow-customshadow rounded-[18px] min-h-[309px] h-auto  bg-[#FFFFFF] border-[#1F96A94D]'>
                    
                    <Image src={`/images/${item.image}.png`} alt={item.name} width={50} height={50} className='mx-auto mt-2' />

                    <h3 className='text-[20px] font-comic font-semibold text-center mt-1'>{item.name}</h3>

                   

                    {/* ⭐ Stars */}
                    <div className='flex justify-center mt-3'>
                        {[...Array(item.rating)].map((_, i) => (
                            <Image
                                key={i}
                                src="/images/yellowStar.png"
                                alt="star"
                                width={20}
                                height={20}
                                className=''
                            />
                        ))}
                    </div>
                    <p className='text-[15px] font-thin font-comic text-[#282828] w-10/12 mx-auto mt-4 text-center'>{item.review}</p>
                </div>
            ))}
        </div>
    );
};

export default AppReview;
