import { Request, Response } from "express";
import * as Services from "../services/service";

export const getAll = async (req: Request, res: Response) => {
    try {
      // Implement server work emulation
      setTimeout(() => {
        // @ts-ignore
        if (!req.abortController.signal.aborted) {
          // business logic is here
          const result = Services.getAll();
  
          return res.send({ result });
        }
      }, 5000); // 5 seconds
    } catch (error) {
      return res.status(500).send(error);
    }
  };

export const searchQuery = async (req: Request, res: Response) => {
  try {
    // Implement server work emulation
    setTimeout(() => {
      // @ts-ignore
      if (!req.abortController.signal.aborted) {
        // business logic is here
        const email = req.query.email as string;
        const number = req.query.number as string;

        console.log("request:", email, number ? number : "(no number)");

        const result = Services.searchQuery(email, number);

        console.log("response:", JSON.stringify(result));

        return res.send({ result });
      }
    }, 5000); // 5 seconds
  } catch (error) {
    return res.status(500).send(error);
  }
};
