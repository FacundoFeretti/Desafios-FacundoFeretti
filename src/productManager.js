import fs from "fs"

export default class ProductManager{
    constructor(){
        this.path = "./files/productos.json"
    }

    getProductById = async (givenId) => {
        
        const products = await this.getProducts();
        
        const findProduct = products.find(e => e.id == givenId);
        
        if(findProduct){
            console.log(findProduct)
            return findProduct
        } else {     
            console.log("Not Found")
            return ["No se encontro producto"]
        }
    }
    
    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        const products = await this.getProducts();
        
        const automaticId = products.length + 1
        
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: automaticId
        }

        products.push(product)
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
    }

    getProducts = async () => {
        if(fs.existsSync(this.path)){
            const data = await fs.promises.readFile(this.path, "utf-8")
            const products = JSON.parse(data);
            return products;
        } else {
            return []
        }
    }

    
    updateProduct = async (givenId, updatedObject) => {
        // Se requiere pasar un objeto con las key que se desea actualizar.
        const products = await this.getProducts();

        const productIndex = products.findIndex(e => e.id === givenId);

        if(productIndex !== -1){
            const updatedProduct = {
               ...products[productIndex],
               ...updatedObject,
               id: givenId
            }

            products[productIndex] = updatedProduct;
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            console.log("Se actualizo el producto")
        } else {
            console.log(`El producto con el id: ${givenId} no fue encontrado`)
        };
        
    }

    deleteProduct = async (givenId) => {
        
        const products = await this.getProducts();        
        
        const productToDelete = await products.indexOf(products.find(e => e.id === givenId))

        if(productToDelete > -1){
            products.splice(productToDelete, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            console.log("Product deleted")
        } else {
            console.log("There is no product with that ID")
        }  
    }
}

