import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { type RootState } from "../store/store";
import { logout } from "../store/authSlice";


export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    // setIsLoggedIn(true);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-bold text-xl text-gray-800 tracking-tight">Mitti Scan</span>
          </Link>

          {isLoggedIn && (
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-gray-600 hover:text-[#27b755] font-medium transition-colors">Dashboard</Link>
              <Link to="/history" className="text-gray-600 hover:text-[#27b755] font-medium transition-colors">History</Link>
            </div>
          )}

          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-700 font-medium rounded-lg border-[#27b755] hover:border-[#1f9645] border px-4 py-2 transition-colors">
                  Log in
                </Link>
                <Link to="/signup" className="bg-[#27b755] hover:bg-[#1f9645] text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  Sign up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/scan" className="bg-[#27b755] hover:bg-[#1f9645] text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm">
                  + Scan Card
                </Link>
                <div className="relative group">
                  <button className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="p-2">
                      <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}