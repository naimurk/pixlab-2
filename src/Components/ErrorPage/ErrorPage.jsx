import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <>
      <main class="flex justify-center items-center min-h-[calc(100vh-56px)] md:min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
        <div class="w-full max-w-md">
          <div class="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg">
            <div class="h-24 bg-gradient-to-r from-blue-500 to-purple-600"></div>

            <div class="p-6">
              <div class="flex flex-col items-center -mt-20 mb-4">
                <img
                  src="/placeholder-avatar.png"
                  class="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 bg-gray-300"
                />
              </div>

              <div class="text-center">
                <h1 class="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
                  Username
                </h1>
                <p class="text-gray-600 dark:text-gray-400 mb-3">@username</p>

                <div class="flex justify-center items-center mb-4">
                  <a href="/pricing">
                    <Link to="/pricing" class="flex items-center text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full transition-all duration-300 hover:from-purple-600 hover:to-pink-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-zap w-4 h-4 mr-2"
                      >
                        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                      </svg>
                      <span>Upgrade to Premium</span>
                    </Link>
                  </a>
                </div>

                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  No bio available
                </p>

                <button class="flex items-center justify-center w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-log-out mr-2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" x2="9" y1="12" y2="12"></line>
                  </svg>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ErrorPage;
