import { listarEvento, cadastrarEvento } from "../../controllers/EventoController"
import * as EventoModel from "../../models/EventoModel";

describe("listarEvento unit test", () => {

  it("should return 200 when events exist", async () => {

    const req = {} as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    jest.spyOn(EventoModel, "listarEvento").mockResolvedValue([
      { nomeEvento: "Show" }
    ] as any);

    await listarEvento(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

  });

});

describe("cadastrarEvento unit test", () => {

  it("should return 201 when event is created", async () => {

    const req = {
      body: {
        nomeEvento: "Show",
        data: "2025-10-10",
        tipo_Evento: "Musica",
        texto: "Evento musical"
      },
      file: null
    } as any;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;

    jest.spyOn(EventoModel, "cadastrarEvento").mockResolvedValue({
      id: 1,
      nomeEvento: "Show"
    } as any);

    await cadastrarEvento(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

  });

});