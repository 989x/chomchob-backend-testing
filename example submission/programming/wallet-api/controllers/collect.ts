import { Request, Response } from "express";
import Collect from "../models/collect";

export const getAllCollects = async (req: Request, res: Response) => {
  try {
    const collects = await Collect.findAll();
    return res.status(200).json(collects);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getCollectById = async (req: Request, res: Response) => {
  const { collectId } = req.params;
  
  try {
    const collect = await Collect.findByPk(collectId);

    if (!collect) {
      return res.status(404).json({ error: "Collect not found." });
    }

    return res.status(200).json(collect);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
