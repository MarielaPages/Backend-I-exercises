
class ProductManager{
    constructor(products){
        this.products = products
    }

    addProduct(product){

        if(!product.title || !product.description || !product.price || !product.thumbnail || !product.code ||!product.stock ){
            
            return "todos los campos son obligatorios"

        }else{
            //evaluo si el codigo para este producto ya existe
            let codeObject = this.products.find(item => item.code === product.code)

            //veo que no exista ese codigo para ningun elemento del array de productos
            if(codeObject === undefined){

                if(this.products.length === 0){

                    product.id = 1

                }else if(this.products.length>0){

                    let id = 0
                    
                    for(let i=0; i<this.products.length; i++){

                        id = this.products[i].id + 1

                    }

                    product.id = id
                }

                this.products.push(product)

            }else{
                return 'el codigo para este producto ya existe'
            }
        }

    }

    getProducts(){
        return this.products
    }
    getProductById(id){

        let foundProduct = this.products.find(item => item.id = id)

        if (foundProduct === undefined){

            return 'este producto no existe'

        }else{

            return foundProduct

        }

    }

}

let productos = new ProductManager([])
//console.log(productos)
productos.addProduct({title:'sabana', description: 'sabana blanca', price:'5 euros', thumbnail:'www.', code:1, stock:3})
productos.addProduct({title:'sabana2', description: 'sabana verde', price:'6 euros', thumbnail:'www.', code:2, stock:5})
console.log(productos.getProducts())
console.log(productos.getProductById(2))