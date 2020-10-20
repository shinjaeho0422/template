import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {continents, price} from './Sections/Datas';
import SearchFeature from './Sections/SearchFeature';
import RadioBox from './Sections/RadioBox';
import CheckBox from './Sections/CheckBox';
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import { Card, Row, Col, Carousel } from 'antd';
const {Meta} = Card;            // Ant Design Card


function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)       // 화면에 상품 최대 8개 노출
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })

    const [SearchTerm, setSearchTerm] = useState('');

    useEffect(() => {

        let body = {
            skip: Skip,     // 첫 상품부터 노출
            limit: Limit    // 8개만 노출
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
        .then(response => {
            if (response.data.success) {
                if(body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo])
                } else {
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            } else {
                alert('상품 가져오기 실패')
            }
        })
    }

    const loadMoreHandler = () => {

        let skip = Skip + Limit
        let body = {
            skip: skip,     // 첫 상품부터 노출
            limit: Limit,    // 8개만 노출
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {

        return <Col lg={6} md={8} xs={24} key={index}>  {/* max화면일때는 6, middle화면일때는 8, min화면일때는 24 */}
            <Card
                hoverable
                cover={<a href={`/product/${product._id}`} ><ImageSlider images={product.images} /></a>}
            >
            <Meta 
                title={product.title}               // 상품이름 표기
                description={`$${product.price}`}   // 부가설명 가격으로 표기
            />
            </Card>
        </Col>
    })

    const showFilteredResults = (filters) => {
        
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }

        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data) {
            if(data[key]._id === parseInt(value, 10)) {
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {      // 필터링하여 목록 노출
        const newFilters = { ...Filters }
        newFilters[category] = filters

        if(category === 'price') {
            let priceValues = handlePrice(filters)
            newFilters['price'] = priceValues
        }

        showFilteredResults (newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2> Let's Travel Anywhere </h2>
            </div>

            {/* Filter */}
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>

            {/* CheckBox */}
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, 'continents')} />
                </Col>
                <Col lg={12} xs={24}>

            {/* RadioBox */}
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, 'price')} />
                </Col>
            </Row>

            {/* Search */}
            <div style={{display:'flex', justifyContent:'flex-end', margin:'1rem auto'}}>
                <SearchFeature 
                    refreshFunction={updateSearchTerm}
                />       
            </div>

            {/* Cards */}
            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            <br />

            {PostSize >= Limit &&
                <div style={{ display:'flex', justifyContent: 'center' }}>
                    <button onClick={loadMoreHandler}> 더보기 </button>
                </div>
            }
        </div>
    )
}

export default LandingPage
