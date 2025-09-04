'use client';
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import FaqHero from "@/components/faq/FaqHero";
import { useEffect, useState } from 'react';
import LoadingPage from "@/app/loading";
import axios from 'axios';

const Page = () => {
    const [loading, setLoading] = useState(true);
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        const getFaq = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/faq`, {
                    headers: {
                        'x-api-key': `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`,
                    },
                });
                setFaq(response.data.data);
                setLoading(false);
            } catch (error: any) {
                console.log(error.response);
                setLoading(false);
            }
        };
        getFaq();
    }, []);
    

    return (
        <div className="my-10">
            <main className="w-full h-full overflow-auto scrollbar-hide">
                <NavBar />
                {loading ? <LoadingPage /> : <FaqHero faqs={faq} />}
                <Footer />
            </main>
        </div>
    );
};

export default Page;
