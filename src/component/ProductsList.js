import React, { useContext } from 'react';
import { getUrl } from '../services/list';
import { Link } from 'react-router-dom';
import './ProductsList.css';

const ProductsList = ({ list }) => {
  
  return (
    <>
    <div className="pink-box"></div>
      <div className="prod-header">
        PRODUCTS
        </div>
      <div className='container'>
        {list.map((item) => (
          <Link className="prod-link" to={`/product/${item.id}`}>
            <div id={item.id} key={item.id}>
              <div className="prod">
              {item.max_price > item.min_price ? (
                <div className="special-offer">Special Offer</div>
              ) : null}
              <img className={item.max_price > item.min_price ? " image img-opacity" : "image"} 
                src={getUrl(item.images[0].url)}
                key={item.images[0].title}
                alt={item.images[0].title}
              />
              </div>
              <div className="prod-name">{item.title}</div>
              <span className={item.max_price > item.min_price ? "price old-price" : "price"}>{item.max_price}</span>
              {item.max_price > item.min_price ? (
                <span className="price special-price">{item.min_price}</span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductsList;
