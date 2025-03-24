import React from 'react'
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CareerHero from '@/components/career/CareerHero';
import CareerInfo from '@/components/career/CareerInfo';
const page = () => {
    return (
        <div className="my-10">
            <main className="w-full h-full overflow-auto scrollbar-hide">
                <NavBar />
                <CareerHero />
                <CareerInfo />
                
                <Footer />
            </main>
        </div>
    );
}

export default page