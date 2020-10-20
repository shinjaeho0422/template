import React from 'react'
import { Descriptions, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../_actions/user_actions';

function ProductInfo(props) {

    const dispatch = useDispatch();

    const clickHandler = () => {
        //필요한 정보를 Cart 필드에 넣어 준다. (상품 ID, 갯수, 날짜)
        dispatch(addToCart(props.detail._id))
    }

    return (
        <div>
            <Descriptions title="상세정보" bordered>
                <Descriptions.Item label="Price">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="Sold">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="View">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="Description">{props.detail.description}</Descriptions.Item>
            </Descriptions>

            <br />
            <br />
            <br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                    장바구니
                </Button>
            </div>

        </div>
    )
}

export default ProductInfo