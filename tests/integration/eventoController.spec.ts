import request from "supertest";
import {app} from "../../api"
import * as EventoModel from "../../models/EventoModel"
//c

// describe("Evento integration tests", () => {

//   it("should return event list", async () => {

//     const mockEventos = [
//       {
//         nomeEvento: "Show",
//         data: "2025-10-10",
//         tipo_Evento: "Musica",
//         texto: "Evento musical"
//       }
//     ];

//     jest.spyOn(EventoModel, "listarEvento").mockResolvedValue(mockEventos as any);

//     const response = await request(app).get("/api/eventos").set("x-api-key", "1234");
    
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(mockEventos);
//   });
// });

// describe("Evento integration tests", () => {

//   it("should create event and return 201", async () => {
//     const novoEvento = {
//       id: 1,
//       nomeEvento: "Show",
//       data: "2025-10-10",
//       tipo_Evento: "Musica",
//       texto: "Evento musical"
//     };

//     jest.spyOn(EventoModel, "cadastrarEvento").mockResolvedValue(novoEvento as any);

//     const response = await request(app)
//       .post("/api/eventos")
//       .set("x-api-key", "1234")
//       .send({
//         nomeEvento: "Show",
//         data: "2025-10-10",
//         tipo_Evento: "Musica",
//         texto: "Evento musical"
//       });

//     expect(response.status).toBe(201);
//     expect(response.body).toEqual(novoEvento);

//   });

// });
 
