import React, {useState} from 'react'
import {Collapse, Checkbox} from 'antd';

const {Panel} = Collapse;

function CheckBox(props) {

    const [Checked,setChecked] = useState([])

    const handleToggle = (value) => {

        const currentIndex = Checked.indexOf(value)             // 체크 된 상품의 index 확인
        const newChecked = [...Checked]
        
        if(currentIndex === -1) {                               // 체크 된 value가 없으면
            newChecked.push(value)                              // state 넣어줌
        } else {                                                // 이미 체크 됬으면 
            newChecked.splice(currentIndex, 1)                  // 지우기
        }

        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

    const renderCheckboxLists = () => props.list && props.list.map((value, index) => (
        <React.Fragment key={index}>
            <Checkbox onChange={() => handleToggle(value._id)} 
                checked={Checked.indexOf(value._id) === -1 ? false : true} />
                <span>{value.name}</span>
        </React.Fragment>
    ))

    return (
        <div>
            <Collapse defaultActiveKey={['0']}>
                <Panel header="대륙별" key="1">
                    {renderCheckboxLists()}
                </Panel>
            </Collapse>
        </div>
    )
}

export default CheckBox