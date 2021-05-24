import React, { useEffect, useState } from 'react';
import { getList } from './services/list';
import ProductsList from './component/ProductsList';
import Product from './component/Product';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [list, setList] = useState([]);
  const [product, setProduct] = useState();

  useEffect(() => {
    let mounted = true;
    getList().then((items) => {
      if (mounted) {
        setList(items.data);
      }
    });
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Router>
        <div className="header">
          <div className='header-text'>SPECTR<span className="blue-letter">U</span>M</div>
          <div className="border"></div>
          <Link className="blue-letter home-link" to='/'>HOME</Link>
        </div>
          <Route exact path='/'>
            <ProductsList list={list} />
          </Route>
          <Route path='/product/:pid'>
            <Product />
          </Route>
      </Router>
      
    </>
  );
}

export default App;
