export default function Footer(){
    return(
        <>
            <section className="w-full p-12 bg-black flex justify-between items-center">
                <div>
                    <p className="text-sm text-white">Created open-source by @emjjkk and contributors.<br/>All content on this website are the property of their respective owners.</p>
                </div>
                <div className="flex items-center">
                    <p className="text-sm text-white mr-5 text-right">Movie & TV show data <br/>provided by</p>
                    <img src="https://miro.medium.com/v2/resize:fit:512/1*UaUZmFbQmQ4ZstvGQ-JFeA.png" alt="TMDB" className="w-12 h-12 mr-2" />
                    <img src="https://m.media-amazon.com/images/I/51R8OjhFkBL.png" alt="Justwatch" className="w-12 h-12" />
                </div>
            </section>
        </>
    )
}