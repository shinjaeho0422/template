import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux';
import {getCartItems} from '../../../_actions/user_actions';

function CartPage(props) {

    const dispatch = useDispatch();

    useEffect(() => {

        let cartItems=[]

        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {   // 상품이 1개이상 들어있다면
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, props.user.userData.cart))
            }
        }
    }, [])

    return(
        <div>
            Cart Page !!
        </div>
    )
}

export default CartPage