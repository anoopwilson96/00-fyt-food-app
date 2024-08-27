import React from 'react';

export const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row">
     <main className="flex-1 lg:ml-64 p-6 lg:p-10">

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
