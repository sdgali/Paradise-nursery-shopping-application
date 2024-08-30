import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { disableItem } from "../redux/isdisabled";
import "./style/shopingCard.css";

import { addItem } from "../redux/ShopingBasketSlice";


const ShopCart = () => {
  const { data } = useContext(AppContext);
  const disabledItems = useSelector((state) => state.isDisible.disabledItems); 
  const dispatch = useDispatch();

  const groupByfeature = (data) => {
    const groupedData = {};
    data.forEach((item) => {
      const features = item.feature.split(",");
      features.forEach((feature) => {
        if (!groupedData[feature.trim()]) {
          groupedData[feature.trim()] = [];
        }
        groupedData[feature.trim()].push(item);
      });
    });
    return groupedData;
  };

  const groupedData = groupByfeature(data);

  const handleAddToCart = (item) => {
    dispatch(addItem(item)); 


    dispatch(disableItem(item.id)); 
  };

  return (
    <>
      {Object.keys(groupedData).map((feature, index) => (
        <div key={index}>
          <div className="center-container my-2">
            <div id="line"></div>
          </div>
          <div>
            <span id="title">{feature} Plants</span>
          </div>
          <div className="center-container my-2">
            <div id="line"></div>
          </div>
          <div className="mb-4"></div>
          <div className="post ms-3 text-center">
            <div className="container">
              <div className="row">
                {groupedData[feature].map((item) => (
                  <div className="col-4 my-3" key={item.id}>
                    <div className="card" style={{ width: "20rem", position: "relative" }}>
                      <div
                        className="badge bg-danger text-white position-absolute"
                        style={{ top: "1px", right: "1px" }}
                      >
                        Sale
                      </div>
                      <h5 className="card-title my-3 fw-bold">{item.name}</h5>
                      <div className="d-flex justify-content-center">
                        <img
                          src={item.img}
                          className="text-center"
                          style={{ width: "280px", height: "200px", objectFit: "cover", marginBottom: "10px" }}
                        />
                      </div>
                      <p className="card-text text-danger"> ${item.cost}</p>
                      <div className="card-body text-center">
                        <p className="card-text">{item.description}</p>
                      </div>
                      <div className="card-body text-center">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="btn btn-sm btn-success"
                          disabled={disabledItems.includes(item.id)}
                          style={{
                            backgroundColor: disabledItems.includes(item.id) ? "gray" : "green",
                          }}
                        >
                          {disabledItems.includes(item.id) ? "Added to Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShopCart;
