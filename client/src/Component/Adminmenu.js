import React from "react";
import { Link } from "react-router-dom";
const Adminmenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Admin Panel</h4>
          <Link
            to="/dashboard/admin/catageroy"
            className="list-group-item list-group-item-action"
            style={{ color: "black" }}
          >
            Create Category
          </Link>
          <Link
            to="/dashboard/admin/product"
            className="list-group-item list-group-item-action"
            style={{ color: "black" }}
          >
            Create Product
          </Link>
          <Link
            to="/dashboard/admin/user"
            className="list-group-item list-group-item-action"
            style={{ color: "black" }}
          >
            Users
          </Link>
        </div>
      </div>
    </>
  );
};

export default Adminmenu;
