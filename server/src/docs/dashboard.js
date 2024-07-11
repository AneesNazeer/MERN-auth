/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Endpoints for user dashboard
 */

/**
 * @swagger
 * /api/dashboard/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /api/dashboard/items:
 *   get:
 *     summary: Get all items with pagination and search
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pageNo
 *         schema:
 *           type: integer
 *         description: Page number for pagination. Default is 1.
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *         description: Number of items per page. Default is 10.
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Optional search term to filter items by name or description.
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       price:
 *                         type: number
 *                 totalCount:
 *                   type: integer
 *                   description: Total number of items matching the query
 *                 pageNo:
 *                   type: integer
 *                   description: Current page number
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/dashboard/items/{id}:
 *   get:
 *     summary: Get an item by ID
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/dashboard/items/{id}:
 *   put:
 *     summary: Update an item by ID
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Not found
 */

/**
 * @swagger
 * /api/dashboard/items/{id}:
 *   delete:
 *     summary: Delete an item by ID
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       '404':
 *         description: Not found
 *       '500':
 *         description: Internal server error
 */
