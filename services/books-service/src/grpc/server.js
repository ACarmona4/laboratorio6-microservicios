import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";
import { getBookById } from "./handlers/bookGrpcHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "./proto/book.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).books;

export const startGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(bookProto.BookService.service, {
    GetBookById: getBookById,
  });

  const GRPC_PORT = process.env.GRPC_PORT || "50051";

  server.bindAsync(
    `0.0.0.0:${GRPC_PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("Failed to start gRPC server:", error);
        return;
      }

      console.log(`Books gRPC service running on port ${port}`);
    }
  );
};