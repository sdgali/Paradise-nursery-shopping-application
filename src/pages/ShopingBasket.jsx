import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, deleteItem } from "../redux/ShopingBasketSlice";
import { enableItem } from "../redux/isdisabled";

const ShopingBasket = () => {
  const value = useSelector((state) => state.ShopCounter.items);
  const megdars = useSelector((state) => state.ShopCounter.megdars);

  const dispatch = useDispatch();

  const handleIncrease = (id) => {
    dispatch(increment(id));
  };

  const handleDecrease = (id) => {
    if (megdars[id] === 1) {
      handleRemove(id);
    } else {
      dispatch(decrement(id));
    }
  };

  const handleRemove = (id) => {
    dispatch(deleteItem(id)); 
    dispatch(enableItem(id)); 
  };

  return (
    <div className="container mt-4 d-flex flex-column align-items-center">
      {value.length === 0 ? (
        <>
        <h3 className="text-center">
        Total Cart Amount: $
        {value.reduce((acc, plant) => acc + plant.cost * (megdars[plant.id] || 1), 0)}
      </h3>
                  <div className="d-flex flex-column align-items-center mt-4">
                  <button className="btn btn-success my-2">Continue Shopping</button>
                  <button className="btn btn-success my-2">Checkout</button>
                </div>
                </>
      ) : (
        <div>
          <h3 className="text-center">
            Total Cart Amount: $
            {value.reduce((acc, plant) => acc + plant.cost * (megdars[plant.id] || 1), 0)}
          </h3>
          {value.map((plant) => (
            <div key={plant.id} className="card mb-3" style={{ maxWidth: "540px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={plant.img}
                    className="img-fluid rounded-start"
                    alt={plant.name}
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{plant.name}</h5>
                    <p className="card-text">${plant.cost}</p>
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-danger mx-2"
                        onClick={() => handleDecrease(plant.id)}
                      >
                        -
                      </button>
                      <span className="mx-2">{megdars[plant.id] || 1}</span>
                      <button
                        className="btn btn-sm btn-success mx-2"
                        onClick={() => handleIncrease(plant.id)}
                      >
                        +
                      </button>
                    </div>
                    <p className="card-text mt-2">
                      Total: ${plant.cost * (megdars[plant.id] || 1)}
                    </p>
                    <button
                      className="btn btn-sm btn-danger mt-2"
                      onClick={() => handleRemove(plant.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex flex-column align-items-center mt-4">
            <button className="btn btn-success my-2">Continue Shopping</button>
            <button className="btn btn-primary my-2">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopingBasket;
