import { products } from '@/Utils/Products'
import Container from './Component/Container'
import HomeBanner from './Component/HomeBanner'


import ProductCard from './Component/Product/Products'


export default function Home() {
  return (
    <div className='p-8'><Container>
         <div>
          <HomeBanner />
         </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
  {products.map((product: any) => {
    return <ProductCard  key={product.id} data={product}/>
  })}
</div>

      </Container>
      </div>
  )
}
