import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import Mission from "@/components/aboutus/Mission"
import Values from "@/components/aboutus/Values"
import Careers from "@/components/aboutus/Careers"

const page = () => {
    return (
        <div className="my-10 ">
            <main className="w-full h-full overflow-auto scrollbar-hide">
          <NavBar />
          <Mission />
          <Values />
          <Careers />
          <Footer />
          </main>
          </div>
      )
}

export default page