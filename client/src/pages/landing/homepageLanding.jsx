import React from 'react'

export const HomepageLanding = () => {
  return (
    <>
          <section className="flex-grow p-6">
        {/* Services Section */}
        <div className="text-center my-8">
          <h2 className="text-3xl font-bold">Our Services</h2>
          <p className="text-xl mt-4">Delicious meals delivered to your doorstep</p>
        </div>




        <div className="carousel carousel-end rounded-box">

  <div className="carousel-item max-w-2xl max-h-96">
    <img
      src="https://res.cloudinary.com/aw96/image/upload/v1724661687/photo-1652862730749-31dae8981191_h7lhvd.jpg"
      alt="Drink" />
  </div>
  <div className="carousel-item max-w-2xl max-h-96">
    <img
      src="https://pixabay.com/get/g89384946a7f58c1c6b0d8dbb376d3a8359aae9488e3ed40d134162ad9a89532ada6b9b863296334812205f570e2b0f3e6fe5cab21b1ad0e9581e870bfb2ef4864aa31844cc6704d5e2807e79f7a6e758_640.jpg"
      alt="Drink" />
  </div>
  <div className="carousel-item max-w-2xl max-h-96 ">
    <img src="https://res.cloudinary.com/aw96/image/upload/v1724662797/g8c0bdd87aeee50d37147515fc647b003fd1d694817a28e49385262cb6cdec7154e0d4e8bf8da5f058e1bb07db3943666454b7d466b72adde1a790a21b88ddda51c69a7c14b4a7597a14fad87bef0bd88_640_dm8q9t.jpg" alt="Drink" />
  </div>
  <div className="carousel-item max-w-2xl max-h-96">
    <img
      src="https://res.cloudinary.com/aw96/image/upload/v1724661744/photo-1593759608142-e9b18c0dbe86_wrkjjz.jpg"
      alt="Drink" />
  </div>
  <div className="carousel-item max-w-2xl max-h-96">
    <img
      src="https://res.cloudinary.com/aw96/image/upload/v1724661687/photo-1652862730749-31dae8981191_h7lhvd.jpg"
      alt="Drink" />
  </div>
</div>

<div>
<div className="my-8 p-6 bg-base-200 rounded-lg shadow-lg">
  <h1 className="text-4xl font-bold text-center text-primary mb-4">
    Fill Your Tummy - Satisfy Your Cravings Anytime, Anywhere!
  </h1>
  <p className="text-lg leading-relaxed mb-4">
    Welcome to Fill Your Tummy, the ultimate destination for delicious meals delivered right to your doorstep. Whether you're at home, at work, or on the go, our extensive network of top-rated restaurants ensures that your favorite dishes are always just a few clicks away.
  </p>
  <p className="text-lg leading-relaxed mb-4">
    At FYT, we believe that food is more than just sustenance – it's an experience. That's why we partner with the best local eateries to bring you a diverse menu that caters to every taste. From mouth-watering burgers and pizzas to fresh sushi and vegan delights, we've got something for everyone.
  </p>
  <p className="text-lg leading-relaxed">
    Ordering with FYT is fast, easy, and secure. Simply browse our app or website, choose your favorite dishes, and we'll take care of the rest. With real-time tracking and multiple payment options, we make sure that your meal arrives hot, fresh, and on time. Hungry yet? Let FYT fill your tummy today!
  </p>
</div>

</div>

<div className=" flex flex-row justify-center items-center  ">
    <img className='rounded-xl max-w-2xl max-h-96' src="https://res.cloudinary.com/aw96/image/upload/v1723441019/10047397_z9rayn.jpg" />
  </div>


        {/* Sign Up & Login Section */}
        <div className="text-center mt-8 space-x-4">
          <button className="btn btn-primary">Sign Up</button>
          <button className="btn btn-outline">Login</button>
        </div>

        {/* Restaurant & Driver Login Section */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold">Partner with Us</h3>
          <div className="space-x-4 mt-4">
            <button className="btn btn-secondary">Restaurant Login</button>
            <button className="btn btn-secondary">Driver Login</button>
          </div>
        </div>

        {/* Admin Login Section */}
        <div className="text-center mt-12">
          <button className="btn btn-outline btn-accent">Admin Login</button>
        </div>
      </section>
    </>
  )
}
