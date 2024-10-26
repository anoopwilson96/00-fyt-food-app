import React, { useEffect, useState, useRef } from 'react';
import { DarkMode } from '../../UI/DarkMode';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../../services/cartSlice';
import { fetchUserProfile } from '../../services/userSlice';
import { UserLogout } from '../../services/userAPI';
import toast from 'react-hot-toast';
import { getAllRestaurants } from '../../services/restaurantAPI';
import { getAllMenuItems } from '../../services/menuItemsAPI';

export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = useRef(null); // Create a ref for the search container

  const [menuItems, setMenuItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.details);

  useEffect(() => {
    dispatch(fetchCart());
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleAddressChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption === 'addAddress') {
      navigate('/user/my-profile'); // Navigate to add address section
    }
  };

  const cartItems = cart.items || [];
  const cartTotal = cart.subtotal || 0;
  const userAddress = cart.user?.address || user?.address;
  const userImage = cart.user?.image || user?.image;

  // Logout Functionality
  const logout = async () => {
    await UserLogout();
    navigate('/');
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const restaurantData = await getAllRestaurants();
        if (restaurantData) {
          setRestaurants(restaurantData);
        } else {
          toast.error("Failed to fetch restaurants");
        }

        const menuItemData = await getAllMenuItems();
        if (menuItemData) {
          setMenuItems(menuItemData);
        } else {
          toast.error("No menu items received");
        }
      } catch (error) {
        toast.error("Error in fetching data");
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Set the minimum character limit for search
    const minChars = 2;
    if (query.trim().length < minChars) {
        setSearchResults([]); // Clear results if less than 3 characters
        return;
    }

    // Filter menu items and restaurants based on the query
    const filteredMenuItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );

    const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
    );

    // Combine results and limit the total number of results (e.g., to 10)
    const combinedResults = [...filteredMenuItems, ...filteredRestaurants];
    const maxResults = 10; // Set maximum number of results to display
    setSearchResults(combinedResults.slice(0, maxResults)); // Limit results to maxResults
};

  const navigateToResult = (result) => {
    if (result.cuisine) {
      navigate(`/user/restaurant/${result._id}`);
    } else if (result.description || result.dish) {
      navigate(`/user/menu-item/${result._id}`);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  // Click Outside Handler
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSearchResults([]); // Clear search results
      setSearchQuery(''); // Optionally clear the search query as well
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <main className="mx-auto bg-base-300">
      {/* Main Navbar */}
      <div className="navbar flex flex-row items-center justify-around max-w-6xl mx-auto text-gray-800">
        {/* Logo */}
        <Link to={'/user'}>
          <img
            className="h-20 lg:h-24 min-w-20"
            src="https://res.cloudinary.com/aw96/image/upload/v1724584697/fyt_bfgnpm.png"
            alt="FYT Logo"
          />
        </Link>

        {/* Search and Location */}
        <div className="relative" ref={searchRef}> 
          <div className="hidden md:flex flex-row gap-5 px-5">
            <div className="form-control relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="input input-bordered w-24 md:w-44 bg-white"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-3 w-full rounded-md  bg-white shadow-lg z-10">
                  {searchResults.map(result => (
                    <div key={result._id} onClick={() => navigateToResult(result)}>
                      <h3 className="p-2 cursor-pointer">{result.name}</h3> 
                    </div>
                  ))}
                </div>
              )}
            </div>

            <select
              className="bg-white select select-ghost max-w-50"
              defaultValue="default"
              onChange={handleAddressChange}
            >
              <option value="default" disabled>
                {userAddress || 'No Address Available'}
              </option>
              <option value="addAddress">Add Location</option>
            </select>
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <DarkMode />

        {/* Cart Icon with Dropdown */}
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 lg:h-8 lg:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{cartItems.length}</span>
            </div>
          </div>
          <div tabIndex={0} className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">{cartItems.length} Items</span>
              <span className="text-slate-800 font-medium">
                Subtotal: ₹ {cartTotal.toFixed(2)}
              </span>
              <div className="card-actions">
                <Link to={'/user/cart'}>
                  <button className="btn btn-primary btn-block">View cart</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* User Profile & Logout */}
        <div className="dropdown dropdown-hover">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={userImage || 'https://placeimg.com/80/80/people'} alt="User Avatar" />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-[1]">
            <li>
              <Link to={'/user/order-history'} className="justify-between">
                Orders
              </Link>
            </li>
            <li>
              <Link to={'/user/my-profile'} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          </ul>
        </div>
      </div>


      {/* Mobile view */}
      <div className="relative">
        <div className="flex flex-row gap-5 px-5 md:hidden pb-4 mx-auto justify-center">
          <div className="form-control relative">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-24 md:w-44 bg-white"
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute mt-2 top-full w-40 rounded-md bg-white shadow-lg z-10">
                {searchResults.map(result => (
                  <h3 key={result._id} className="p-2 cursor-pointer" onClick={() => navigateToResult(result)}>
                    {result.name}
                  </h3>
                ))}
              </div>
            )}
          </div>

          <select
            className=" select select-ghost max-w-38 bg-white"
            defaultValue="default"
            onChange={handleAddressChange}
          >
            <option value="default" disabled>
              {userAddress || 'No Address Available'}
            </option>
            <option value="addAddress">Add Location</option>
          </select>
        </div>
      </div>
    </main>
  );
};
