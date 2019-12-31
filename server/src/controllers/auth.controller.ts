import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import User, { IUser } from '../models/User';
import {
  signUpValidationSchema,
  signInValidationSchema
} from '../validation-schema/schemas';

export const signUp = async (req: Request, res: Response) => {
  const { fullname, email, password } = req.body || {};
  const { error } = signUpValidationSchema.validate({
    fullname,
    email,
    password
  });
  const isExist = await User.findOne({email: email});
  if (isExist) return res.status(401).json({error: true, message: 'This user is already exist!'});
  if (error) return res.status(402).json(error.details[0].message);
  const user: IUser = new User({
    fullname,
    email,
    password
  });
  user.password = await user.encryptPassword(user.password);
  const savedUser = await user.save();
  const token: string = jwt.sign(
    { _id: savedUser._id, fullname: user.fullname, email: user.email },
    process.env.TOKEN_SECRET || 'tokensecret'
  );
  // res.header('auth-token', token).json(savedUser);
  res.header('auth-token', token).json({success: true, error: null, token});
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body || {};
  const { error } = signInValidationSchema.validate({ email, password });
  if (error) return res.status(403).json(error.details[0].message);
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({error: true, message: 'Email or password is incorrect!'});
  const correctPassword: boolean = await user.validatePassword(password);
  if (!correctPassword) return res.status(405).json({error: true, message: 'Password is incorrect!'});
  const token: string = jwt.sign(
    { _id: user._id, fullname: user.fullname, email: user.email },
    process.env.TOKEN_SECRET || 'tokensecret',
    {
      expiresIn: 60 * 60 * 24
    }
  );
  res.header('auth-token', token).json({success: true, err: null, token});
};

export const profile = async (req: Request, res: Response) => {
  const { userId } = req;
  const user = await User.findById(userId, { password: 0 });
  if (!user) return res.status(406).json({error: true, message: 'User not found!'});
  res.json(user);
};
