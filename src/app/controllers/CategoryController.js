import * as Yup from 'yup';
import Category from '../models/Category.js'
import User from '../models/User.js';

class CategoryController {
    async store (request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, {abortEarly:false });
        } catch (err) {
            return response.status(400).json({error: err.errors});
        }

        const {admin: isAdmin} = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json();
        }

        const { name } = request.body;

        const categoryExists = await Category.findOne({ 
            where: { 
                name,
            }, 
        });


        if (categoryExists) {
            return response.status(400).json({ error: "Category already exists" });
        }

        let path;
        if (request.file) {
            path = request.file.filename;
        }

        console.log(request.file);

        const {id } = await Category.create({
            name,
            path,
        })

        return response.status(201).json({id, name, path});
    }

    async index(request ,response) {
        const categories = await Category.findAll(); //tras todos os produtos
        
        return response.json(categories);
    }

    async update (request, response) {
        const schema = Yup.object({
            name: Yup.string()
        });

        try {
            schema.validateSync(request.body, {abortEarly:false });
        } catch (err) {
            return response.status(400).json({error: err.errors});
        }

        const {admin: isAdmin} = await User.findByPk(request.userId);

        if (!isAdmin) {
            return response.status(401).json();
        }

        const { id } = request.params;
        
        const categoryExists = Category.findByPk(id)

        if (!categoryExists) {
            return response.status(400)
            .json({message: 'Meke sure your category ID is correct.'});
        }


        let path;
        if (request.file) {
            path = request.file.filename;
        }

        const { name } = request.body;


        if (name) {
            const categoryNameExists = await Category.findOne({ 
                where: { 
                name,
                }, 
            });
            
            if (categoryNameExists  && categoryNameExists.id !== +id ) {
                return response.status(400).json({ error: "Category already exists" });
            }
        }

        await Category.update({
            name,
            path,
        },{
            where:{
                id,
            }
        })

        return response.status(200).json();
    }
}

export default new CategoryController();