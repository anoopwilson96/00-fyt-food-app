import React from 'react';

export const HomePage = () => {
  return (
    <div className="flex flex-col lg:flex-row mx-auto">
     <main className="flex-1 p-10 max-w-7xl mx-auto">

        {/* Popular Restaurants Section */}
        <section>

        <div className='MenuItems avatar'>
        <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
         <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
        </div>


          <h2 className="text-3xl font-bold text-center mb-6">Popular Restaurants</h2>
          <div className="Restaurants grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">

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


          </div>


        </section>
      </main>
    </div>
  );
};
