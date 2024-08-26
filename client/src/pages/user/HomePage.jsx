import React from 'react';

export const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* Side Menu */}
      <aside className="bg-base-200 w-20 lg:w-64 fixed h-full flex flex-col items-center lg:items-start">
        <nav className="mt-8 flex flex-col space-y-4 lg:space-y-6">
          <button className="flex items-center hover:bg-primary rounded-full p-3">
            <i className="icon-dish"></i>
            <span className="ml-4 hidden lg:inline">Dishes</span>
          </button>
          <button className="flex items-center hover:bg-primary rounded-full p-3">
            <i className="icon-restaurant"></i>
            <span className="ml-4 hidden lg:inline">Restaurants</span>
          </button>
          <button className="flex items-center hover:bg-primary rounded-full p-3">
            <i className="icon-contact"></i>
            <span className="ml-4 hidden lg:inline">Contact Us</span>
          </button>
          <div className="border-t my-4 w-full"></div>
          <button className="flex items-center hover:bg-primary rounded-full p-3">
            <i className="icon-order"></i>
            <span className="ml-4 hidden lg:inline">Order List</span>
          </button>
          <button className="flex items-center hover:bg-primary rounded-full p-3">
            <i className="icon-account"></i>
            <span className="ml-4 hidden lg:inline">My Account</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-10">
        {/* Popular Dishes Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">Popular Dishes</h2>
          <div className="carousel carousel-center space-x-4">
            <div className="carousel-item max-h-10 max-w-10">
              <img src="https://foodfolksandfun.net/wp-content/uploads/2020/05/Boston-Baked-Bean-1024x1536.jpg" alt="Dish 1" className="rounded-full" />
              <p className="text-center mt-2">Dish 1</p>
            </div>
            <div className="carousel-item max-h-10 max-w-10">
              <img src="https://foodfolksandfun.net/wp-content/uploads/2020/05/Boston-Baked-Bean-1024x1536.jpg" alt="Dish 2" className="rounded-full" />
              <p className="text-center mt-2">Dish 2</p>
            </div>
            {/* Add more dishes here */}
          </div>
        </section>

        {/* Popular Restaurants Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-6">Popular Restaurants</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <div className="card bg-base-100 shadow-lg">
              <img src="https://foodfolksandfun.net/wp-content/uploads/2020/05/Boston-Baked-Bean-1024x1536.jpg" alt="Restaurant 1" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Restaurant 1</h3>
                <p>Location 1</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★★★★★</span>
                </div>
              </div>
            </div>
            <div className="card bg-base-100 shadow-lg">
              <img src="https://foodfolksandfun.net/wp-content/uploads/2020/05/Boston-Baked-Bean-1024x1536.jpg" alt="Restaurant 2" className="rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Restaurant 2</h3>
                <p>Location 2</p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">★★★★★</span>
                </div>
              </div>
            </div>
            {/* Add more restaurant cards here */}
          </div>
        </section>
      </main>
    </div>
  );
};
