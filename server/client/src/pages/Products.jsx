import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

const Products = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
      .get('/products')
      .then(response => {
        console.log(response)
        setProducts(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.log(error)
        setIsLoading(false)
      })
  }, [])

  const element = Array.isArray(products)
    ? products.map((product, i) => {
        return (
          <div key={i}>
            <img
              style={{ width: '150px', height: '150px' }}
              src={product.img}
            />
            <h4>{product.name}</h4>
            <h4>{product.price}</h4>
          </div>
        )
      })
    : []

  return (
    <div>
      <h4>Products that you can find in our barbershop</h4>
      {isLoading ? (
        <div className='lds-circle'>
          <div>
            <img src='https://i.ibb.co/txxHvs7/d83a35fd-1000-466d-9ceb-dd287592c18e.jpg' />{' '}
          </div>
        </div>
      ) : (
        ''
      )}
      <div className='product'>{element}</div>
    </div>
  )
}
export default Products
