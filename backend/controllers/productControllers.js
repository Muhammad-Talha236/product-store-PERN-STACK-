import {sql} from "../config/db.js";

export const getallProducts = async (req, res) => {
    try {
        const products = await sql`
            SELECT * FROM products
            ORDER BY created_at DESC
        `;

        console.log("Fetched products:", products);

        res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
       console.log("error in get all proudct function", error);
        res.status(500).json({success: false, message: "internal server error"});
    }
};
export const createProducts = async (req, res) => {

    const {name,price,image} = req.body;

    if(!name || !price || !image){
        return res.status(404).json({success: false, message: "all field required"})
    }

    try {
            const newproduct = await sql `
             INSERT INTO products (name,price,image)
             VALUES ($(name),$(price),$(image))
             RETURNING *
            `
            res.status(201).json({success:true, data: newproduct[0]});

    } catch (error){
        console.log("error in create proudct function", error);
        res.status(500).json({success: false, message: "internal server error"});

    }

};
export const getProduct = async (req, res) => {
    const {id} = req.params;

    try{
            const product = await sql `
              SELECT * FROM product WHERE id= ${id}
            `;

            res.status(200),json({success: true, data: product[0]});


    }
    catch (error){
        console.log("error in get proudct function", error);
        res.status(500).json({success: false, message: "internal server error"});
    }


}; 
export const updateProduct = async (req, res) => {
    const {id}= req.params;
    const {name,price,image}= req.body;

    try{
          const uproduct = await sql`
                UPDATE products 
                SET name = ${name},
                price = ${price},
                image = ${image}
                where id = ${id}
                RETURNING * 
          `;
          if(uProduct.length === 0){
            return res.status(400).json({
                success: false,
                message: "product not found"
            });
          }
          res.status(200).json({success:true,data: uproduct[0]});
    }
    catch (error){
        console.log("Error in update function");
        res.status(500).json({success:false, message: "error in internal server"});
    }
};
export const deleteProduct = async (req, res) => {
     const {id} = req.params;
     try{
           const dproduct = await sql `
             DELETE FROM product WHERE id = ${id}
             RETURNING *
           `;
             if(dProduct.length === 0){
            return res.status(400).json({
                success: false,
                message: "product not found"
            });
          }
           res.status(200).json({success: true, data: dproduct})
     }catch (error){
        console.log("Error in del function");
        res.status(500).json({success:false, message: "error in internal server"});
     }
};