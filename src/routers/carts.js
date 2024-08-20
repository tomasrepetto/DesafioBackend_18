import { Router } from 'express';
import { authorize, auth } from '../middleware/authMiddleware.js';
import { purchase } from '../controllers/purchaseController.js';
import { addProductInCart, createCart, deleteCart, deleteProductsInCart, getCartsById, updateCart, updateProductsInCart } from '../controllers/cartsController.js';

const router = Router();

/**
 * @swagger
 * /api/carts/{cid}:
 *   get:
 *     summary: Obtener un carrito por su ID
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito obtenido exitosamente
 */
router.get('/:cid', getCartsById);

/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Crear un nuevo carrito
 *     responses:
 *       201:
 *         description: Carrito creado exitosamente
 */
router.post('/', createCart);

/**
 * @swagger
 * /api/carts/{cid}/product/{pid}:
 *   post:
 *     summary: Agregar un producto a un carrito
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto agregado exitosamente
 */
router.post('/:cid/product/:pid', addProductInCart);

/**
 * @swagger
 * /api/carts/{cid}/products/{pid}:
 *   delete:
 *     summary: Eliminar un producto específico de un carrito
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente
 */
router.delete('/:cid/products/:pid', deleteProductsInCart);

/**
 * @swagger
 * /api/carts/{cid}:
 *   put:
 *     summary: Actualizar un carrito
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito actualizado exitosamente
 */
router.put('/:cid', updateCart);

/**
 * @swagger
 * /api/carts/{cid}/products/{pid}:
 *   put:
 *     summary: Actualizar un producto específico en un carrito
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente
 */
router.put('/:cid/products/:pid', updateProductsInCart);

/**
 * @swagger
 * /api/carts/{cid}:
 *   delete:
 *     summary: Eliminar un carrito
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito eliminado exitosamente
 */
router.delete('/:cid', deleteCart);

/**
 * @swagger
 * /api/carts/{cid}/purchase:
 *   post:
 *     summary: Realizar una compra
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Compra realizada exitosamente
 */
router.post('/:cid/purchase', auth, authorize(['user']), purchase);

export default router;

