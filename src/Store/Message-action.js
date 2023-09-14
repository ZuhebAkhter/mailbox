import { replaceCart } from "./MessageSlice";


const email=localStorage.getItem('user')
      const userEmailz=email?.split(/[@.]/).join("");

export const fetchCartData = () => {
    return async (dispatch) => {
      const fetchData = async () => {
        const response = await fetch(
        `https://try2-7cacf-default-rtdb.asia-southeast1.firebasedatabase.app/${userEmailz}.json`
        );
  
        if (!response.ok) {
          throw new Error('Could not fetch cart data!');
        }
  
        const data = await response.json();
  
        return data;
      };
  
      try {
        const cartData = await fetchData();
        dispatch(
          replaceCart({
            Messages: cartData.Messages || [],
          })
        );
      } catch (error) {
        alert(error)
      }
    };
  };