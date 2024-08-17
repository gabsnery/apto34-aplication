import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/products", ({ request, params, cookies }) => {
    return HttpResponse.json([
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Doe" },
    ]);
  }),
  // Outros handlers podem ser adicionados aqui
];
