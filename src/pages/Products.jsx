import { useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom'; 
import { addProduct, removeProduct } from '../features/productSlice'; 

function Products() { 
  const dispatch = useDispatch(); 
  const productList = useSelector((state) => state.products); 

  // สร้าง state สำหรับเก็บข้อมูลสินค้าใหม่
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
  });

  const handleAddProduct = () => { 
    if (newProduct.id && newProduct.name && newProduct.price && newProduct.description) {
      dispatch(addProduct(newProduct)); 
      // รีเซ็ตฟอร์มหลังจากเพิ่มสินค้าเสร็จแล้ว
      setNewProduct({ id: '', name: '', price: '' });
    } else {
      alert('กรุณากรอกข้อมูลสินค้าให้ครบถ้วน');
    }
  }; 

  const handleRemoveProduct = (id) => { 
    dispatch(removeProduct(id)); 
  }; 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  return ( 
    <div> 
      <h2>Product List</h2> 
      <ul> 
        {productList.map(product => ( 
          <li key={product.id}> 
            <Link to={`/product/${product.id}`}> 
              {product.name} - {product.price} 
            </Link> 
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button> 
          </li> 
        ))} 
      </ul> 

      <h3>Add a New Product</h3>
      <div>
        <input 
          type="text" 
          name="id" 
          placeholder="Product ID" 
          value={newProduct.id} 
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="name" 
          placeholder="Product Name" 
          value={newProduct.name} 
          onChange={handleInputChange} 
        />
        <input 
          type="text" 
          name="price" 
          placeholder="Product Price" 
          value={newProduct.price} 
          onChange={handleInputChange} 
        />
        <button onClick={handleAddProduct}>Add Product</button> 
      </div>
    </div> 
  ); 
} 

export default Products;
