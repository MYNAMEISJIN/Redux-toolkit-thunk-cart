import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

//그냥 여기는 http request 하는 곳 thunk 를 이용하는 방식임


export const fetchCartData =()=>{  //데이터 가져오기
    return async (dispatch) =>{
        const fetchData = async () =>{//GET 요청 // 가져오기 로직
            const response = await fetch(
                'https://redux-toolkit-asyn-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json'
            )

                if(!response.ok) // 에러 확인하는 코드
                {
                    throw new Error('Could not fetch cart data!')
                }

            const data = await response.json();

            return data;
        }

        try{
           const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items:cartData.items ||[],
                totalQuantity: cartData.totalQuantity,
            }));

        } catch(error){
            dispatch(
                uiActions.showNotification({
                    status:'error',
                    title:'Error!',
                    message:'Fetch failed!',
                })
            )
        }
    }
}






export const sendCartData = (cart) => {//Thunk and //cart  정보 back에 주기 //데이터 추가
    return async (dispatch) => {
        dispatch(uiActions.showNotification({ 
            status: "pending",
            title: "Sending...",
            message: "Sending cart data!",
        }))

        const sendRequest = async () => {
            const response = await fetch('https://redux-toolkit-asyn-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        items: cart.items,
                        totalQuantity: cart.totalQuantity,
                    }),
                })

            if (!response.ok) {
                throw new Error("Sending cart data failed.");
            }
        }
        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "Success!",
                    message: "Sent cart data successfully!",
                })
            )

        } catch (error) {
            dispatch(
                uiActions.showNotification({
                    status: 'error',
                    title: 'Error',
                    message: 'Sending cart data failed!',
                })
            )
        }


    }
}
