import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], filterText:string):any {
    if( filterText == '' ||products.length == 0)
    {
      console.log('aaa')
      const x = 'asd'
      
      return products
    }
    else
    {
      /*const arrr = products.filter((product:any)=>{
        console.log(product)
        return product.name.toLowerCase().includes(filterText.toLowerCase())
      })
      console.log(arrr)*/
    /*  for(let i = 0 ; i<products.length ; i++)
      {
        if(!products[i].name.toLowerCase().includes(filterText.toLowerCase()))
        {
          products.splice(i,1)
          i--
        }
      }
      console.log(products)

      return products*/
      const arr: any[] =[] 
      for(let i = 0 ; i<products.length ; i++)
      {
        if(products[i].name.toLowerCase().includes(filterText.toLowerCase()))
        {
            arr.push(products[i])
        }
      }
      console.log(products)

      return arr

    }
    /*else
    {
      /*products.filter((product:any)=>{
        console.log(product)
        return product.name.toLowerCase()
      })*/
    //}

  }

}
