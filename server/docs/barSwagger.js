/**
 * @swagger
 * components:
 *   schemas:
 *     Bar:
 *       type: object
 *       required:
 *         - name
 *         - adresse
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID of the bar
 *         name:
 *           type: string
 *           description: Name of the bar
 *         adresse:
 *           type: string
 *           description: Address of the bar
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Update timestamp
 *       example:
 *         name: Le Bar à Bières
 *         adresse: 10 Rue de la Soif, Paris
 * 
 * 
 *   parameters:
 *     barIdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: ID of the bar
 * 
 * @swagger
 * tags:
 *   - name: Bars
 *     description: Bar management
 *   - name: Bières
 *     description: Beer management
 *   - name: Commandes
 *     description: Order management
 */

/**
 * @swagger
 * /bars:
 *   get:
 *     summary: Get all bars
 *     tags: [Bars]
 *     parameters:
 *       - in: query
 *         name: ville
 *         schema:
 *           type: string
 *         description: Filter bars by city
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter bars by name
 *     responses:
 *       200:
 *         description: List of bars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bar'
 * 
 *   post:
 *     summary: Add a new bar
 *     tags: [Bars]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bar'
 *     responses:
 *       201:
 *         description: Bar successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bar'
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /bars/{id}:
 *   get:
 *     summary: Get bar details by ID
 *     tags: [Bars]
 *     parameters:
 *       - $ref: '#/components/parameters/barIdParam'
 *     responses:
 *       200:
 *         description: Bar details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bar'
 *       404:
 *         description: Bar not found
 *
 *   put:
 *     summary: Update a bar
 *     tags: [Bars]
 *     parameters:
 *       - $ref: '#/components/parameters/barIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bar'
 *     responses:
 *       200:
 *         description: Bar successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bar'
 *       404:
 *         description: Bar not found
 *
 *   delete:
 *     summary: Delete a bar and related beers and orders
 *     tags: [Bars]
 *     parameters:
 *       - $ref: '#/components/parameters/barIdParam'
 *     responses:
 *       200:
 *         description: Bar successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Bar supprimé
 *       404:
 *         description: Bar not found
 */

/**
 * @swagger
 * /bars/{id}/degree:
 *   get:
 *     summary: Get average beer degree for a bar
 *     tags: [Bars, Bières]
 *     parameters:
 *       - $ref: '#/components/parameters/barIdParam'
 *       - in: query
 *         name: prix_min
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum price filter
 *       - in: query
 *         name: prix_max
 *         schema:
 *           type: number
 *           format: float
 *         description: Maximum price filter
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date (for orders)
 *     responses:
 *       200:
 *         description: Average beer degree
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 degreeMoyen:
 *                   type: number
 *                   format: float
 *                   example: 6.5
 *       404:
 *         description: Bar not found
 */

/**
 * @swagger
 * /bars/{id}/commandes:
 *   get:
 *     summary: Get orders for a bar with optional filters
 *     tags: [Bars, Commandes]
 *     parameters:
 *       - $ref: '#/components/parameters/barIdParam'
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter by date
 *       - in: query
 *         name: prix_min
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum price filter
 *       - in: query
 *         name: prix_max
 *         schema:
 *           type: number
 *           format: float
 *         description: Maximum price filter
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter by order status
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by order name
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Commande'
 *       404:
 *         description: Bar not found
 */

/**
 * @swagger
 * /bars/{id}/biere:
 *   get:
 *     summary: Get sorted and filtered beers for a bar
 *     tags: [Bars, Bières]
 *     parameters:
 *       - $ref: '#/components/parameters/barIdParam'
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort direction by name
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of results to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of results to skip
 *       - in: query
 *         name: degree_min
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum degree filter
 *       - in: query
 *         name: degree_max
 *         schema:
 *           type: number
 *           format: float
 *         description: Maximum degree filter
 *       - in: query
 *         name: prix_min
 *         schema:
 *           type: number
 *           format: float
 *         description: Minimum price filter
 *       - in: query
 *         name: prix_max
 *         schema:
 *           type: number
 *           format: float
 *         description: Maximum price filter
 *     responses:
 *       200:
 *         description: List of beers with count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 rows:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Biere'
 *       404:
 *         description: Bar not found
 */