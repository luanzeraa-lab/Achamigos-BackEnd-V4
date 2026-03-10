import { Request, Response } from 'express';
import * as EventoModel from '../models/EventoModel';

export const listarEvento = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventos = await EventoModel.listarEvento();
    if (!eventos) {
      res.status(404).json({ message: "Nenhum evento encontrado" });
      return;
    }
    res.status(200).json(eventos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const cadastrarEvento = async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvento = await EventoModel.cadastrarEvento(req.body, req.file);
    if (!newEvento) {
      res.status(400).json({ message: "Erro ao cadastrar Evento" });
      return;
    }
    res.status(201).json(newEvento);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const alterarEvento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dados = req.body;
    const eventoAtualizado = await EventoModel.alterarEvento(id as string, dados);

    if (!eventoAtualizado) {
      res.status(400).json({ message: "Erro ao alterar Evento" });
      return;
    }
    res.status(201).json(eventoAtualizado);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const excluirEvento = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const eventoDeletado = await EventoModel.excluirEvento(id as string);

    if (!eventoDeletado) {
      res.status(400).json({ message: "Erro ao alterar Evento" });
      return;
    }
    res.status(201).json(eventoDeletado);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
