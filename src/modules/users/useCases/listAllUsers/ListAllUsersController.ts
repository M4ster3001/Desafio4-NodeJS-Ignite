import { Request, Response } from "express";
import { IncomingHttpHeaders } from "http";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

interface ICustomHeaders {
  user_id: string;
}
interface IReqCustom<THeader> extends Request {
  headers: IncomingHttpHeaders & THeader;
}
class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: IReqCustom<ICustomHeaders>, response: Response): Response {
    try {
      const id = request.headers.user_id;
      const listUser = this.listAllUsersUseCase.execute({ user_id: id });

      return response.json(listUser);
    } catch (ex) {
      return response.status(400).json({ error: ex });
    }
  }
}

export { ListAllUsersController };
