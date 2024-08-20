import { productModel } from "../models/productsModel.js";

export const getProductsService = async ({limit = 10, page = 1, sort, query}) => {
        page = page == 0 ? 1 : page;
        page = Number(page);
        limit = Number(limit);
        const skip = (page-1) * limit;
        const sortOrderOptions = {'asc': -1, 'desc': 1}
        sort = sortOrderOptions[sort] || null;

        try {
            if(query)
                query = JSON.parse(decodeURIComponent(query))
        } catch (error) {
            console.log('Error al parsear: ', error);
            query = {}
        }

        const queryProducts = productModel.find(query).limit(limit).skip(skip).lean();
        if (sort !== null)
        queryProducts.sort({price:sort});
        const [productos, totalDocs] = await Promise.all([queryProducts, productModel.countDocuments(query)]);

        const totalPages = Math.ceil(totalDocs/limit);
        const hastNextPage = page < totalPages;
        const hastPrePage = page > 1;
        const prevPage = hastPrePage ? page -1 : null;
        const nextPage = hastNextPage ? page +1 : null;
        
        return {
            totalDocs,
            page,
            limit,
            query:JSON.stringify(query),
            totalPages,
            hastPrePage,
            hastNextPage,
            prevPage,
            nextPage,
            payload: productos,
            prevLink: '',
            nextLink: '',
        }
}

export const getProductsByIdService = async (pid) =>  await productModel.findById(pid);


export const addProductService = async ({title, description, price, thumbnails, code, stock, category, status}) => await productModel.create({title, description, price, thumbnails, code, stock, category, status});

export const deleteProductsByIdService = async (pid) => await productModel.findByIdAndDelete(pid);
    

export const modificarProductsService = async (pid, rest) => await productModel.findByIdAndUpdate(pid,{...rest},{new:true});
    