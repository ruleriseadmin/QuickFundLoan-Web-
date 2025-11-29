import React from 'react'
import Image from 'next/image'

const AppReview = () => {
    const dummyReview = [
        {
            name: "Abisola Ayobami",
            review: "Using Quickfund was a great experience! The loan application was simple, and I got my funds within minutes without any hassle. I loved that no collateral was required.",
            image: "revImage",
            rating: 5
        },
        {
            name: "Laashile",
            review: "Quickfund is fast and easy to access. I recommend it for everyone and fast in loan disbursement. I give you 5 stars.",
            image: "Laashile",
            rating: 5
        },
        {
            name: "Adebayo Yemi",
            review: "The best of all ❤️❤️❤️❤️ loan apps and very much easier to apply good interest fee and more available in need of cash",
            image: "Adebayo",
            rating: 5
        },
        {
            name: "Grace Ofumen",
            review: "Very nice loan app easy to apply I recommend to everyone to try .and also please you guys should be given a reasonable loan that someone can use for his urgent need thanks",
            image: "Grace",
            rating: 5
        },
        {
            name: "Danjuma",
            review: "Using Quickfund was a great experience! The loan application was simple, and I got my funds within minutes without any hassle. I loved that no collateral was required.",
            image: "Danjuma",
            rating: 5
        },
        {
            name: "James Ugbala",
            review: "My experience with them was very smooth, I hope to build a good relationship with them, and I hope they will increase the tenor for loan repayment, kudos to the teams",
            image: "James",
            rating: 5
        },
        {
            name: "Jesutofunmi",
            review: "Getting a loan was fast and seamless. I would recommend using this app if you need a quick loan.",
            image: "Jesutofunmi",
            rating: 5
        },
        {
            name: "Afolabi David",
            review: "I love this app ♥️When you need a loan app🙌This is the best app for you guys🫶🫂♥️💕🌹",
            image: "Afolabi",
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
