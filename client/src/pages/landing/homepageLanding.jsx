import React from 'react'
import { Link } from 'react-router-dom'

export const HomepageLanding = () => {
  return (
    < div className="mx-auto max-w-5xl">
          <section className="flex-grow p-6">
        {/* Services Section */}
        <div className="text-center my-8">
          <h2 className="text-3xl font-bold font-sans">Fill Your Tummy</h2>
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
      src="https://res.cloudinary.com/aw96/image/upload/v1724662655/g89384946a7f58c1c6b0d8dbb376d3a8359aae9488e3ed40d134162ad9a89532ada6b9b863296334812205f570e2b0f3e6fe5cab21b1ad0e9581e870bfb2ef4864aa31844cc6704d5e2807e79f7a6e758_640_fkywvk.jpg"
      alt="Drink" />
  </div>
  <div className="carousel-item max-w-2xl max-h-96 ">
    <img src="https://res.cloudinary.com/aw96/image/upload/v1724662797/g8c0bdd87aeee50d37147515fc647b003fd1d694817a28e49385262cb6cdec7154e0d4e8bf8da5f058e1bb07db3943666454b7d466b72adde1a790a21b88ddda51c69a7c14b4a7597a14fad87bef0bd88_640_dm8q9t.jpg" alt="Drink" />
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

<div className=" flex flex-row justify-center items-center ">
    <img className='rounded-xl  max-h-96  lg:max-w-2xl ' src="https://res.cloudinary.com/aw96/image/upload/v1723441019/10047397_z9rayn.jpg" />
  </div>


        {/* Sign Up & Login Section */}
        <div className="text-center mt-8 space-x-4">
          
          <Link to={'/signup'}> 
          <button className="btn btn-primary">Sign Up</button>
          </Link>

          <Link to={'/login'}>
          <button className="btn btn-outline">Login</button> 
          </Link>
          
        </div>

<div className="my-8 p-6 bg-base-200 rounded-lg shadow-lg text-center mt-12">
  <h2 className="text-2xl font-bold mb-4">Partner with Fill Your Tummy</h2>
  <p className="text-lg leading-relaxed">
    Elevate your business by partnering with FYT (Fill Your Tummy)! Whether you're a restaurant aiming to expand your reach or a delivery partner looking to boost your earnings, we offer seamless integration and unmatched support. Join our growing network and connect with customers eager to enjoy your delicious offerings. Let’s grow together!
  </p>
  <Link to={'contact-us'}><button className="mt-8 btn btn-primary">Contact Us</button></Link>
</div>





        {/* Restaurant & Driver Login Section */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold">Partner's Homepage</h3>
          <div className="space-x-4 mt-4">
            <button className="btn btn-secondary mb-10">Restaurant Homepage</button>
            <button className="btn btn-secondary">Driver Homepage</button>
          </div>
        </div>

        {/* Admin Login Section */}
        <div className="text-center mt-12">
          <Link to={'/admin/login'}>
          <button className="btn btn-outline btn-accent">Admin Login</button>
          </Link>
          
        </div>
      </section>
    </div>
  )
}
