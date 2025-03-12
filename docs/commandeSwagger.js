/**
 * @swagger
 * components:
 *   schemas:
 *     Commande:
 *       type: object
 *       required:
 *         - name
 *         - prix
 *         - date
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the order
 *         name:
 *           type: string
 *           description: Name reference for the order
 *         prix:
 *           type: number
 *           format: float
 *           description: Total price of the order
 *           minimum: 0
 *         date:
 *           type: string
 *           format: date-time
 *           description: Date of the order (must be before or equal to current date)
 *         status:
 *           type: string
 *           enum: [brouillon, en cours, terminée]
 *           description: Status of the order
 *         BarId:
 *           type: integer
 *           description: ID of the bar where the order was placed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Update timestamp
 *       example:
 *         name: Table 5
 *         prix: 25.50
 *         date: 2025-03-12T14:30:00Z
 *         status: en cours
 *         BarId: 1
 * 
 *   parameters:
 *     barIdParam:
 *       in: path
 *       name: id_bar
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID of the bar
 *     commandeIdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID of the order
 */

/**
 * @swagger
 * /bars/{id_bar}/commandes:
 *   get:
 *     summary: Get all orders for a specific bar
 *     tags: [Commandes]
 *     parameters:
 *       - $ref: '#/components/parameters/barIdParam'
 *     responses:
 *       200:
 *         description: List of orders for the bar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commande'
 *       404:
 *         description: Bar not found
 * 
 *   post:
 *     summary: Add a new order to a bar
 *     tags: [Commandes]
 *     parameters:
 *       - $ref: '#/components/parameters/barIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - prix
 *               - date
 *               - status
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name reference for the order
 *               prix:
 *                 type: number
 *                 format: float
 *                 description: Total price of the order
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the order
 *               status:
 *                 type: string
 *                 enum: [brouillon, en cours, terminée]
 *                 description: Status of the order
 *             example:
 *               name: Table 3
 *               prix: 32.50
 *               date: 2025-03-12T15:00:00Z
 *               status: brouillon
 *     responses:
 *       201:
 *         description: Order successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commande'
 *       404:
 *         description: Bar not found
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /commandes/{id}:
 *   get:
 *     summary: Get order details by ID
 *     tags: [Commandes]
 *     parameters:
 *       - $ref: '#/components/parameters/commandeIdParam'
 *     responses:
 *       200:
 *         description: Order details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commande'
 *       404:
 *         description: Order not found
 *
 *   put:
 *     summary: Update an order
 *     tags: [Commandes]
 *     parameters:
 *       - $ref: '#/components/parameters/commandeIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name reference for the order
 *               prix:
 *                 type: number
 *                 format: float
 *                 description: Total price of the order
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Date of the order
 *               status:
 *                 type: string
 *                 enum: [brouillon, en cours, terminée]
 *                 description: Status of the order
 *             example:
 *               name: Table 3
 *               prix: 42.50
 *               date: 2025-03-12T15:00:00Z
 *               status: en cours
 *     responses:
 *       200:
 *         description: Order successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Commande'
 *       404:
 *         description: Order not found
 *       400:
 *         description: Cannot modify a completed order or validation error
 *
 *   delete:
 *     summary: Delete an order
 *     tags: [Commandes]
 *     parameters:
 *       - $ref: '#/components/parameters/commandeIdParam'
 *     responses:
 *       200:
 *         description: Order successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Commande supprimée avec succès
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /commandes/details/{id}:
 *   get:
 *     summary: Generate and download a PDF with order details
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the order
 *     responses:
 *       200:
 *         description: PDF file download
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Order not found
 *       500:
 *         description: Error generating or downloading PDF
 */