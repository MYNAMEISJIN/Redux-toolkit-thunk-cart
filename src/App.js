import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from './store/ui-slice';
import React from 'react';
import Notification from './components/UI/Notification';
import { fetchCartData, sendCartData } from './store/cart-actions';


let isInitial = true;// 처음에 동작 하지 않기 하기 위해

//Thunk : 한 액션을 지연시키는 함

function App() {
  const dispatch = useDispatch()
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification)


  useEffect(() => {//가져오기 로직
    dispatch(fetchCartData())
  }, [dispatch])

  useEffect(() => {
    if (isInitial) { //앱에 처음들어갔을때 빈 장바구니를 보내는걸 방지하기 위함.
      isInitial = false;
      return;
    }
    if (cart.changed) {//처음 데이터 들고올때는 보낼 필요가 없으므로 방지, 맨처음 데이터 베이스에서 데이터를 불려들일때 불필요하게 보내지는거 방지
      dispatch((sendCartData(cart))) 
    }

  }, [cart, dispatch]);

  return (
    <React.Fragment>
      {notification && <Notification
        status={notification.status}
        title={notification.title}
        message={notification.message}
      />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>

  );
}

export default App;
