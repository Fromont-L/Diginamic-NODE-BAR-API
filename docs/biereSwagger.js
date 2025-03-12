/**
 * @swagger
 * components:
 *   schemas:
 *     Biere:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - degree
 *         - prix
 *         - BarId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de la bière
 *         name:
 *           type: string
 *           description: Nom de la bière
 *         description:
 *           type: string
 *           description: Description de la bière
 *         degree:
 *           type: number
 *           format: float
 *           description: Degré d'alcool de la bière
 *         prix:
 *           type: number
 *           format: float
 *           description: Prix de la bière
 *         BarId:
 *           type: integer
 *           description: ID du bar associé
 *       example:
 *         id: 1
 *         name: "IPA artisanale"
 *         description: "Une bière houblonnée et fruitée."
 *         degree: 5.6
 *         prix: 6.5
 *         BarId: 1
 */

/**
 * @swagger
 * /bars/{id_bar}/biere:
 *   post:
 *     summary: Ajouter une bière à un bar
 *     tags: [Bières]
 *     parameters:
 *       - in: path
 *         name: id_bar
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du bar où ajouter la bière
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Biere'
 *     responses:
 *       201:
 *         description: Bière ajoutée avec succès
 *       404:
 *         description: Bar non trouvé
 */

/**
 * @swagger
 * /biere/{id_biere}:
 *   put:
 *     summary: Modifier une bière
 *     tags: [Bières]
 *     parameters:
 *       - in: path
 *         name: id_biere
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la bière à modifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Biere'
 *     responses:
 *       200:
 *         description: Bière modifiée avec succès
 *       404:
 *         description: Bière non trouvée
 */

/**
 * @swagger
 * /biere/{id_biere}:
 *   delete:
 *     summary: Supprimer une bière
 *     tags: [Bières]
 *     parameters:
 *       - in: path
 *         name: id_biere
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la bière à supprimer
 *     responses:
 *       200:
 *         description: Bière supprimée avec succès
 *       404:
 *         description: Bière non trouvée
 */

/**
 * @swagger
 * /bars/{id_bar}/biere:
 *   get:
 *     summary: Liste des bières d'un bar
 *     tags: [Bières]
 *     parameters:
 *       - in: path
 *         name: id_bar
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du bar dont on veut récupérer les bières
 *     responses:
 *       200:
 *         description: Liste des bières
 *       404:
 *         description: Bar non trouvé
 */

/**
 * @swagger
 * /biere/{id_biere}:
 *   get:
 *     summary: Détail d'une bière
 *     tags: [Bières]
 *     parameters:
 *       - in: path
 *         name: id_biere
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la bière à récupérer
 *     responses:
 *       200:
 *         description: Informations de la bière
 *       404:
 *         description: Bière non trouvée
 */