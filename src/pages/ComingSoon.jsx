import React from "react";
import { NavLink } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // Optional: lucide-react untuk ikon

const ComingSoon = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-6">
      <div className="card shadow-xl bg-base-100 w-full max-w-md p-6">
        <div className="flex flex-col items-center">
          <div className="text-error text-6xl font-bold">404</div>
          <div className="text-xl font-semibold mt-2">NOT FOUND</div>
          <AlertTriangle className="text-warning w-10 h-10 mt-4" />
        </div>

        <div className="mt-6 text-left space-y-4">
          <div>
            <p className="font-medium">What you're looking for might be:</p>
            <ul className="list-disc list-inside text-sm text-gray-500">
              <li>Missing</li>
              <li>Deleted</li>
              <li>Require permission</li>
            </ul>
          </div>

          <div>
            <p className="font-medium">Suggested Action:</p>
            <ul className="list-disc list-inside text-sm text-gray-500">
              <li>Please wait for an update</li>
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <NavLink to="/home" className="btn btn-primary w-full">
            Back to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
