import { Request, Response } from 'express'
import * as UserModel from '../models/UserModel'
import bcrypt from 'bcryptjs'

export const listarUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.listarUser()
    if (!users) {
      res.status(404).json({ message: 'Nenhum usuário encontrado' })
      return
    }
    res.status(200).json(users)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const cadastrarUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = { ...req.body }

    if (!userData.nome || !userData.cnpj || !userData.telefone || !userData.userLogin || !userData.senha || !userData.email) {
      res.status(400).json({ message: 'Campos obrigatórios não informados' })
      return
    }

    const users = await UserModel.listarUser()
    if (users?.some((u: any) => u.email === userData.email)) {
      res.status(400).json({ message: 'E-mail já cadastrado' })
      return
    }

    if (users?.some((u: any) => u.userLogin === userData.userLogin)) {
      res.status(400).json({ message: 'Login já cadastrado' })
      return
    }

    userData.senha = bcrypt.hashSync(userData.senha, 10)

    const newUser = await UserModel.criarUser(userData, req.file)
    const userObj = (newUser as any)?.toObject ? (newUser as any).toObject() : { ...(newUser as any) }
    delete userObj.senha
    delete userObj.__v

    res.status(201).json(userObj)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }
}

export const alterarUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const dadosAtualizados = { ...req.body }

    if (dadosAtualizados.senha && dadosAtualizados.senha.trim() !== '') {
      dadosAtualizados.senha = bcrypt.hashSync(dadosAtualizados.senha, 10)
    }

    const usuarioAtualizado = await UserModel.alterarUser(id as string, dadosAtualizados)

    if (!usuarioAtualizado) {
      res.status(400).json({ message: 'Usuário não encontrado' })
      return
    }
    res.status(200).json(usuarioAtualizado)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

export const excluirUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params
    const usuarioDeletado = await UserModel.excluirUser(id as string)
    if (!usuarioDeletado) {
      res.status(400).json({ message: 'Usuário não encontrado' })
      return
    }
    res.status(200).json(usuarioDeletado)
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
