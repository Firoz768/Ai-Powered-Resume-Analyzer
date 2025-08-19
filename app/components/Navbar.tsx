import { Link } from "react-router"

const Navbar = () => {

  return (

    <nav className="navbar" >

      <Link to="/" >

        <p className="text-2xl font-bold text-gradient" >ResumAi</p>

      </Link>

      <Link to="/routes/upload " className="primary-button w-fit">

        Upload Resume

      </Link>

    </nav>

  )

}



export default Navbar