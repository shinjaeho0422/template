const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({     // Product Model 생성
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxlength: 100,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

productSchema.index({
    title:'text',
    description:'text'
}, {
    weights:{               // 검색 시 title을 중점적으로 검색
        title:5,
        description:1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }