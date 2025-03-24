import NavBar from "./NavBar"

const NoMatch = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <NavBar />
            <div className="flex flex-1 items-center justify-center">
                <div className="text-center p-8 rounded-2xl shadow-lg border border-blue-200 bg-white">
                    <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
                    <p className="text-xl text-blue-800 mb-6">Oops! The page you're looking for doesn't exist.</p>
                    <a
                        href="/"
                        className="inline-block px-6 py-3 bg-blue-500 text-white text-base font-medium rounded-xl hover:bg-blue-600 transition"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NoMatch;
