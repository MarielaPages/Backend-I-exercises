import fs from 'fs'

export class Product{
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
    }
}

export class ProductManager{
    constructor(file){
        this.file = file
    }
    async addProduct(product){
        try{
            //chequeo si el archivo con la lista de productos existe y si no existe la creo vacia
            if(!fs.existsSync(this.file)){
                await fs.promises.writeFile(`${this.file}`, '[]')
            }

            //leo los datos guardados en el archivo
            let products = await fs.promises.readFile(`${this.file}`, 'utf-8')
            //Lo parseo para poder trabajar con los objetos del array en formato JS
            let productsArray = JSON.parse(products)

            //chequeo que no exista el producto con el mismo codigo
            let codeObjectExists = productsArray.find(item => item.code === product.code)
            if(codeObjectExists === undefined){

                if(productsArray.length === 0){
                    product.id = 1
                }else{

                    product.id = productsArray[productsArray.length -1].id + 1 
                }

                productsArray.push(product)
                
                await fs.promises.writeFile(`${this.file}`, JSON.stringify(productsArray))

        }else{
            return 'the code for this product already exists'
        }

        }catch(err){
            throw err
        }
        
    }

    async getProducts(){
        try{
            //si existe el archivo lo lee y lo parsea para que se pueda trabajar con el donde sea que lo invoquemos, sino, se devuelve un array vacio
            if(fs.existsSync(this.file)){
                let products = await fs.promises.readFile(`${this.file}`, 'utf-8')
                return JSON.parse(products)
            }
            return []
        }catch(err){
            throw new err
        }
    }
    
    async getProductById(id){
        try{

            if(fs.existsSync(this.file)){
                let products = await this.getProducts()
                let productById = products.find(item => item.id === id)

                if (productById !== undefined){
                    return productById
                }else{
                    return "this product doesn't exist"
                }

            }
            return "this product doesn't exist"

        }catch(err){
            throw err
        }


    }
}