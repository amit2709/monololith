import React, { useEffect, useState } from 'react';
import { getUrl, getProduct,addToCart } from '../services/list';
import { useParams,Link } from 'react-router-dom';
import './Product.css';

const Product = () => {
  const [product, setProduct] = useState({});
  const [variants, setVariants] = useState([]);
  const [count, setCount] = useState(1);
  const [showImg, setshowImg] = useState();
  const { pid } = useParams();

  useEffect(() => {
    getProduct(pid).then((items) => {
      setProduct(items.data);
      setVariants(items.data.variants);
    });
  }, [pid]);

  const filterVariantsHandler = (event) => {
    const filters = [
      ...document.querySelectorAll('.attribute-filter').values(),
    ].map((filter) => filter.value);
    if (!filters.find((filter) => filter !== '0'))
      return setVariants(product.variants);
    let filteredVariants = product.variants.filter((variant) => {
      for (let i = 0; i < variant.labels.length; i++) {
        // console.log(`${variant.labels[i].label_id}  ${filters[i]}`);
        if (filters[i] !== '0' && variant.labels[i].label_id !== filters[i])
          return false;
      }
      return true;
    });
    console.log(filteredVariants);
    setVariants(filteredVariants);
  };

  const renderAttributes = (attribute, variantsTitles) => {
    return (
      <select
        className='attribute-filter'
        key={attribute.id}
        onChange={(e) => filterVariantsHandler(e)}
      >
        <option value={0}>{`Choose ${attribute.title}`}</option>
        {renderLabels(attribute, variantsTitles)}
      </select>
    );
  };

  const renderLabels = ({ labels }, variantsTitles) => {
    labels = labels.filter((label) =>
      variantsTitles.join('').includes(label.title)
    );
    return labels.map((label) => (
      <option key={label.id} value={label.id}>
        {label.title}
      </option>
    ));
  };

  function incrementCount(){
    setCount(prevCount => prevCount + 1)
  }

  function decrementCount(){
    setCount(prevCount => prevCount > 1 ? prevCount - 1 :  1)
  }

  function showImgClickHandler(img){
    setshowImg(img);
  }

    return (
      <>
      <div className="prod-container">
        <div className="images">
            <div className="show-main-img">
              <img className="main-img" src={showImg != null ? getUrl(showImg.url) : product.images && getUrl(product.images[0].url)} 
              key={showImg != null ? showImg.title : product.images && product.images[0].title} 
              alt={showImg != null ? showImg.title : product.images && product.images[0].title} />
            </div>
            <div className='img-row'>
              {product.images &&
                product.images.map((img) => {
                  return <div onClick={() =>showImgClickHandler(img)} class="show-prod-img"><img class="image" key={img.title} src={getUrl(img.url)} alt={img.title} /></div>;
              })}
            </div>
        </div>
        
        <div className="prod-info">
            <div className="prod-name">{product.title}</div>
            <span className={product.max_price > product.min_price ? "price old-price" : "price"}>{product.max_price}</span>
                {product.max_price > product.min_price ? (
                  <span className="price special-price">{product.min_price}</span>
                ) : null}
            <div class="prod-desc">{product.description}</div>
        </div>
        <div className="order-group">
        <div className="attributes-group-select">
            {product.attributes &&
              variants &&
              product.attributes.map((attribute) => {
                const variantsTitles = variants.map((variant) => variant.title);
                return renderAttributes(attribute, variantsTitles);
              })}
        </div>
        <div className="quantity-group">
        <span className="quantity-title">Quantity</span>
          <button className="quantity-button" onClick={decrementCount}>-</button>
          <div className="quantity-display">{count}</div>
          <button className="quantity-button" onClick={incrementCount}>+</button>
        </div>
        <Link  to={'/'}>
        <button onClick={() => addToCart(count,variants[0].id)}  className="add-to-cart">Add to cart</button>
        </Link>
        </div>
      </div>
      </>
    );
  };


export default Product;
