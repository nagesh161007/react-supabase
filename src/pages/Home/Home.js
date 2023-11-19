import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../utils/supabase";
import Loader from "../../components/Loader/Loader";
import "./Home.css";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase.from("listings").select();

      if (error) {
        setError(error);
      } else {
        setListings(data);
      }
    };

    fetchListings();
  }, []);

  if (error) {
    return <div>Error loading listings: {error.message}</div>;
  }

  return (
    <div className="listings-container">
      {!listings.length ? (
        <Loader></Loader>
      ) : (
        listings.map((listing) => (
          <div key={listing.listing_id} className="listing-card">
            <h3>{listing.title}</h3>
            <img src={listing.image_url} alt={listing.title} />
            <p>Size: {listing.size}</p>
            <p>Price: ${listing.price}</p>
            <p>
              Posted on: {new Date(listing.created_at).toLocaleDateString()}
            </p>
            <Link to={`/listing/${listing.listing_id}`}>View Details</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Listings;
