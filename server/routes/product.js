const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')                  // uploads 폴더에 파일저장
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
var upload = multer({ storage: storage }).single('file')

router.post('/image', (req, res) => {
                                            // 가져온 이미지 저장
    upload(req, res, err => {
        if(err) {
            return req.json({success: false, err})
        }
        return res.json({success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/', (req, res) => {
  // 받아온 정보들을 DB에 저장
  const product = new Product(req.body)
  
  product.save((err) => {
    if(err) return res.status(400).json({ success: false, err})
    return res.status(200).json({success: true})
  })
})

router.post('/products', (req, res) => {
                                              // product collection에 들어있는 모든 상품정보를 가져오기

    let limit = req.body.limit ? parseInt(req.body.limit) : 20;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm            // LandingPage searchTerm 검색기능

    let findArgs = {};

    for(let key in req.body.filters) {

      if(req.body.filters[key].length > 0) {

        if(key === 'price') {
          findArgs[key] = {
            $gte: req.body.filters[key][0],   // 라디오박스 가격이 크거나 같으면
            $lte: req.body.filters[key][1]    // 라디오박스 가격이 작거나 같으면
          }
        } else {
          findArgs[key] = req.body.filters[key];
        }
      }
    }

    if(term) {
      Product.find(findArgs)          // DB collection의 정보들을 가져오기
      .find({$text: {$search: term}})
      .populate('writer')
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
      if (err) return res.status(400).json({success: false, err})   // 에러 발생 시 처리
      return res.status(200).json({
        success: true, productInfo,
        postSize: productInfo.length
      })
    })

  } else {
    Product.find(findArgs)          // DB collection의 정보들을 가져오기
    .populate('writer')
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({success: false, err})   // 에러 발생 시 처리
      return res.status(200).json({
        success: true, productInfo,
        postSize: productInfo.length
      })
    })
  }
})

router.get('/products_by_id', (req, res) => {

  let type = req.query.type
  let productIds = req.query.id

  if(type === 'array') {
    let ids = req.query.id.split(',')
    productIds = ids.map(item=> {
      return item
    })
  }

  // productId를 이용해 DB에서 productId와 같은 상품의 정보를 가져옴
  Product.find({_id: {$in: productIds}})
  .populate('writer')
  .exec((err, product) => {
    if(err) return res.status(400).send(err)
    return res.status(200).send({ success:true, product })
  })
})


module.exports = router;
