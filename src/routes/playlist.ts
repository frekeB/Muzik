import { Router } from "express";

export const playlistRoute = Router();

/**
 * @swagger
 * /api/playlist:
 *   get:
 *     description: Testing for get api
 *     responses:
 *       200:
 *         description: Returns hello playlist
 */
playlistRoute
  .get("/", (req, res) => {
    res.send("hello playlist");
  })
  .post("/create", () => {})
  .put("/update/:id", () => {})
  .delete("/delete/:id", () => {});
