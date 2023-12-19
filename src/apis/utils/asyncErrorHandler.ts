const asyncErrorHandler = (func: Function) => {
  return (req: Request, res: Response, next: Function) => {
    func(req, res, next).catch((err: any) => {
      next(err)
    })
  }
}

export default asyncErrorHandler