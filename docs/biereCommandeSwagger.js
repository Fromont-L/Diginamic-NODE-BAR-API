/**
 * @swagger
 * components:
 *   schemas:
 *     BiereCommande:
 *       type: object
 *       required:
 *         - BiereId
 *         - CommandeId
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-généré de l'association
 *         BiereId:
 *           type: integer
 *           description: ID de la bière associée
 *         CommandeId:
 *           type: integer
 *           description: ID de la commande associée
 *       example:
 *         id: 1
 *         BiereId: 3
 *         CommandeId: 5
 */

/**
 * @swagger
 * /commandes/{id}/biere/{id_biere}:
 *   post:
 *     summary: Ajouter une bière à une commande
 *     tags: [BiereCommande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la commande
 *       - in: path
 *         name: id_biere
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la bière à ajouter
 *     responses:
 *       201:
 *         description: Bière ajoutée à la commande avec succès
 *       404:
 *         description: Commande ou bière non trouvée
 */

/**
 * @swagger
 * /commandes/{id}/biere/{id_biere}:
 *   delete:
 *     summary: Supprimer une bière d'une commande
 *     tags: [BiereCommande]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la commande
 *       - in: path
 *         name: id_biere
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la bière à supprimer
 *     responses:
 *       200:
 *         description: Bière supprimée de la commande avec succès
 *       404:
 *         description: Association bière-commande non trouvée
 */