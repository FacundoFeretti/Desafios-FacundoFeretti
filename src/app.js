import express from "express"
import ProductManager from "./productManager.js";

const app = express();

app.use(express.urlencoded({entended:true}))

const productManager = new ProductManager()


app.get('/productos', async (req, res) => {
    const {limit} = req.query;
    if(limit){
        const products = await productManager.getProducts();
        const filtrado = await products.slice(0, limit);
        res.send(filtrado) 
    } else {
        const productos = await productManager.getProducts();
        res.send(productos)
    }
})

app.get("/productos/:id", async(req, res) => {
    const producto = await productManager.getProductById(req.params.id)
    res.send(producto);
})


app.listen(8080, () =>{
    console.log("Servidor Activo")
})

