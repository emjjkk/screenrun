export default function NewsHome() {
    return (
        <>
            <h2 className="text-2xl font-bold text-white mb-6 mt-6">Latest News</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 h-auto md:h-[90vh]">
                {/* Main content - spans full width on mobile, 2 columns on desktop */}
                <div className="md:col-span-2 md:row-span-4 bg-white h-64 md:h-auto rounded-md">1</div>
                
                {/* Right side content - stacks below on mobile */}
                <div className="md:row-span-2 md:col-start-3 bg-white h-64 md:h-auto rounded-md">2</div>
                <div className="md:row-span-2 md:col-start-4 bg-white h-64 md:h-auto rounded-md">3</div>
                <div className="md:row-span-2 md:col-start-3 md:row-start-3 bg-white h-64 md:h-auto rounded-md">4</div>
                <div className="md:row-span-2 md:col-start-4 md:row-start-3 bg-white h-64 md:h-auto rounded-md">5</div>
            </div>
        </>
    )
}