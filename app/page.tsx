import Navbar from '@/components/Navbar'
import HomeLightbox from '@/components/HomeLightbox'
import TVShowsHome from '@/components/TVShowsHome'
import MoviesHome from '@/components/MoviesHome'



export default function Home(){
  return(
    <>
      <HomeLightbox/>
      <Navbar/>
      <main className="h-screen p-4 md:p-12">
        <MoviesHome/>
        <TVShowsHome/>
      </main>
    </>
  )
}