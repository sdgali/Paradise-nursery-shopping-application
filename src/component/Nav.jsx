import './style/nav.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import logo from '../../public/pngegg.png'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalItems } from "../redux/ShopingBasketSlice";





const Nav = () => {

  const totalItems = useSelector(selectTotalItems);



  return ( 
    <>
    
    <div className='containers'>

    
    <Link to="/" >

      <div className='logo'>
      <img src={logo}/>
      
      <div className='title'>

      <p> Paradise Nursery </p>    
      <span>Where Green meels Serenity</span>

    </div>
      </div>      
      </Link>
      
      <div className='plants'> 
        <p>plants</p>
      </div>
   
    <Link to="/shopingBasket" className="bi bi-cart4 "> {totalItems} </Link>

  </div>
    </>
   );
}
 
export default Nav;