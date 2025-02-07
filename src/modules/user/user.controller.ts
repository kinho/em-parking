import express, { Router, Request, Response } from 'express'
import { validateRequest } from '@modules/middleware/validate.middleware'
import { createUser, getUser, listUsers } from './user.service'
import { CreateUserArgs, ListUserArgs } from './user.type'

const router = express.Router()

router.get('/', validateRequest(ListUserArgs), async (req: Request, res: Response) => {
  const { data, total } = await listUsers(req.body)
  res.json({ data, total }).status(200)
})

router.post('/', validateRequest(CreateUserArgs), async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body)
    res.json(user).status(201)
  } catch (error) {
    res.status(500).json({ error })
  }
})

router.get('/:id', async (req: Request, res: Response) => {
  const user = await getUser(req.params.id)
  res.json(user).status(200)
})

export default router
