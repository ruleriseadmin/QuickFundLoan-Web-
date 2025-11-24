import React from 'react'
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Hero from '@/components/review/Hero';
import AppReview from '@/components/review/AppReview';
const page = () => {
    return (
        <div className="my-10">
            <main className="w-full h-full overflow-auto scrollbar-hide">
                <NavBar />
                <Hero />
                <AppReview />
                <Footer />
            </main>
        </div>
    );
}

export default page