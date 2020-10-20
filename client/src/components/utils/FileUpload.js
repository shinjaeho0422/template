import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import {PlusOutlined} from '@ant-design/icons';     // AntDesign 아이콘이름 불러오기
import axios from 'axios';

function FileUpload(props) {
    
    const [Images, setImages] = useState([])

    const dropHandler = (files) => {
        let formData = new FormData();

        const config = {
            header: {'content-type': 'multipart/fomr-data'}     // 헤더에는 파일의 타입지정
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)      // 폼데이터에 파일에대한 정보저장
            .then(response => {
                if(response.data.success){
                    setImages([...Images, response.data.filePath])  // 모든 이미지 저장
                    props.refreshFunction([...Images, response.data.filePath])

                } else{
                    alert('파일 저장 실패')
                }
            })
    }

    const deleteHandler = (image) =>{                       // 이미지 삭제 핸들러
        const currentIndex= Images.indexOf(image);
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
                <div 
                    style={{width:300, height:240, border: '1px solid lightgray',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    {...getRootProps()}>
                    <input {...getInputProps()} />
                    <PlusOutlined style={{fontSize:'3rem'}}/>    {/* antDesign에서 +버튼 활용*/}
                </div>
            )}
        </Dropzone>

        <div style={{display:'flex', width:'350px', height:'240px', overflowX:'scroll'}}>
            {Images.map((image, index) => (
                <div onClick ={() => deleteHandler(image)}key={index}>              {/* 클릭 시 업로드한 이미지 삭제 */}
                    <img style={{minWidth:'300px', width:'300px', height:'240px'}}
                        src={`http://localhost:5000/${image}`}
                    />
                </div>
            ))}
        </div>                        

    </div>
    )
}

export default FileUpload