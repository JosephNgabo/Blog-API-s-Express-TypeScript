import { Router, Request, Response, NextFunction } from "express";
import Post from '../../models/post'
import { BadRequestError } from "../../../common/src";
import { User } from "../../models/user";


const router = Router()

router.post('/api/post/new', async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;

    if(!title || !content) {
        return next( new BadRequestError('title and content are required!'))
    }

    const newPost = Post.build({
        title,
        content
    });

    await newPost.save()
    await User.findOneAndUpdate({_id: req.currentUser!.userId}),
    { $push: { posts: newPost.id }}

    res.status(201).send(newPost)
})

export { router as newPostRouter }