import Navbar from '@/components/Navbar'
import HomeLightbox from '@/components/HomeLightbox'
import TVShowsHome from '@/components/TVShowsHome'
import MoviesHome from '@/components/MoviesHome'
import NewsHome from '@/components/NewsHome'
import Footer from '@/components/Footer'


export default function Home(){
  return(
    <>
      <HomeLightbox/>
      <Navbar/>
      <main className="p-4 md:p-12">
        <MoviesHome/>
        <TVShowsHome/>
        <NewsHome/>
      </main>
      <Footer/>
    </>
  )
}