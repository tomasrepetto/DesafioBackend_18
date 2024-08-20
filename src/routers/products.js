import { Router } from 'express';
import { getProductsController, getProductsByIdController, addProductController, deleteProduct, modificarProductsController } from '../controllers/productsController.js';
import { generateMockMusicProducts } from '../middleware/mocking.js';
import passport from 'passport';
import { auth, authorize } from '../middleware/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /api/products/mockingproducts:
 *   get:
 *     summary: Generar y obtener productos de prueba
 *     responses:
 *       200:
 *         description: Productos de prueba obtenidos exitosamente
 */
router.get('/mockingproducts', (req, res) => {
    const mockProducts = generateMockMusicProducts(100);
    res.status(200).json(mockProducts);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Productos obtenidos exitosamente
 */
router.get('/', getProductsController);

/**
 * @swagger
 * /api/products/{pid}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto obtenido exitosamente
 */
router.get('/:pid', getProductsByIdController);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Agregar un nuevo producto
 *     responses:
 *       201:
 *         description: Producto agregado exitosamente
 */
router.post('/', auth, authorize(['premium']), addProductController); // Solo usuarios premium pueden crear productos

/**
 * @swagger
 * /api/products/{pid}:
 *   put:
 *     summary: Modificar un producto existente
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto modificado exitosamente
 */
router.put('/:pid', auth, authorize(['premium']), modificarProductsController); // Solo usuarios premium pueden modificar productos

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */
router.delete('/:id', auth, authorize(['premium']), deleteProduct); // Solo usuarios premium pueden eliminar productos

export default router;


