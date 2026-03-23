export const notFound = () => new Response("Not found", { status: 404 });
export const badRequest = (message: string) => new Response(message, { status: 400 });
