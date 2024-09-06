import { NavLink } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <div>
      <ul className="nav">
        <li>
          {/* Creating Home navlink, and setting it as root/default page */}
          <NavLink
            to="/"
            // Function assigning class name based on if the link is active //
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'}
            // Navlink only becomes active when URL is "/". End of function //
            end
          >Home</NavLink>
        </li>
        <li>
          <NavLink to="/SavedCandidates"
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'}
          >About</NavLink>
        </li>
      </ul>
    </div>
  )
};

export default Nav;
