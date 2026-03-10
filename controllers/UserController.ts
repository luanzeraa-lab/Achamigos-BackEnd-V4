import { Request, Response } from 'express';
import * as UserModel from '../models/UserModel';
import bcrypt from 'bcryptjs';

export const listarUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.listarUser();
    if (!users) {
      res.status(404).json({ message: "Nenhum usuário encontrado" });
      return;
    }
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const alterarUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dadosAtualizados = { ...req.body };

    if (dadosAtualizados.senha && dadosAtualizados.senha.trim() !== "") {
      dadosAtualizados.senha = bcrypt.hashSync(dadosAtualizados.senha, 10);
    }

    const usuarioAtualizado = await UserModel.alterarUser(id as string, dadosAtualizados);

    if (!usuarioAtualizado) {
      res.status(400).json({ message: "Usuário não encontrado" });
      return;
    }
    res.status(200).json(usuarioAtualizado);

  } catch (error) {
    res.status(400).json({ error: "Erro" });
  }
};

export const excluirUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const usuarioDeletado = await UserModel.excluirUser(id as string);
    console.log(usuarioDeletado);
    if (!usuarioDeletado) {
      res.status(400).json({ message: "Usuário não encontrado" });
      return;
    }
    res.status(200).json(usuarioDeletado);
  } catch (error) {
    res.status(400).json({ error: "Erro" });
  }
};
