import React, { useState } from 'react'
import { Input } from 'antd';
const { Search } = Input;       // Ant Design Search Box 가져오기

function SearchFeature(props) {

    const [SearchTerm, setSearchTerm] = useState('')

    const searchHandler = (event) => {
        setSearchTerm(event.currentTarget.value)
        props.refreshFunction(event.currentTarget.value)
    }

    return (
        <div>
            <Search
                placeholder="input search text"
                onChange={searchHandler}
                style={{ width: 200 }}
                value={SearchTerm}
                />
        </div>
    )
}

export default SearchFeature