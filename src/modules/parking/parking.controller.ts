import express, { Request, Response } from 'express'

const router = express.Router()

// POST /parking - { plate: 'FAA-1234' }

router.post('/:plate', async (req: Request, res: Response) => {
  try {
    res.json({}).status(201)
  } catch (error) {
    res.status(500).json({ error })
  }
})

// PUT /parking/:id/out

router.put('/:number/exit', async (req: Request, res: Response) => {
  try {
    res.json({}).status(201)
  } catch (error) {
    res.status(500).json({ error })
  }
})

// PUT /parking/:id/pay

router.put('/:number/pay', async (req: Request, res: Response) => {
  try {
    res.json({}).status(201)
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default router
