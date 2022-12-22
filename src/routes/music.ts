import express from "express";
export const musicRouter = express.Router();
/**
 * @swagger
 * /api/music:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello music
 */
musicRouter
  .get("/", (req, res) => {
    res.send("hello music");
  })
  .post("/create", () => {})
  .put("/update/:id", () => {})
  .delete("/delete/:id", () => {});
