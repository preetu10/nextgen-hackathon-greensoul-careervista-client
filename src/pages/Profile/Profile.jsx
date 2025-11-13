import React, { useContext } from "react";
import { AuthContext } from "../../FirebaseProvider/FirebaseProvider";
import { Link } from "react-router-dom";

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-center">
      <div className="card bg-[#e3e3e3] w-3/4">
        <figure className="px-10 pt-10">
          <img
            src={
              user?.photoURL || "https://i.ibb.co/sVJ3S81/cat-551554-1280.jpg"
            }
            alt="User Photo"
            className="rounded-xl w-24 h-24"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl">{user?.displayName}</h2>
          <p>
            <span className="font-semibold text-black text-xl">Email: </span>
            <span className="text-xl">{user?.email}</span>
          </p>
          <div className="card-actions py-8">
            <Link to="/v1/update-profile">
              <button className="btn mr-1 bg-[#f6f5f5] text-[#048998] hover:text-white hover:bg-[#048998] font-semibold text-lg border-0 rounded-md">
                Update Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
