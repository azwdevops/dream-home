import { categories } from "@/data.jsx";
import { Link } from "react-router-dom";

import "@/styles/Categories.scss";

const Categories = () => {
  return (
    <div className="categories">
      <h1>Explore Top Categories</h1>
      <p>
        Find your perfect home away from home: Explore unique vacation rentals
        for every kind of traveler. Immerse yourself in the local scene, unwind
        in comfort, and create lasting memories in your dream destination.
      </p>
      <div className="categories-list">
        {categories?.slice(1, 7).map((category, index) => (
          <Link to={``} key={index}>
            <div className="category">
              <img src={category?.img} alt={category.label} />
              <div className="overlay"></div>
              <div className="category-text">
                <div className="category-text-icon">{category.icon}</div>
                <p>{category.label}</p>
              </div>
            </div>
          </Link>
        ))}
        ,
      </div>
    </div>
  );
};

export default Categories;
