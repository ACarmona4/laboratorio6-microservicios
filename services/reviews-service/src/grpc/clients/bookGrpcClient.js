import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROTO_PATH = path.join(__dirname, "../proto/book.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).books;

const BOOKS_GRPC_HOST = process.env.BOOKS_GRPC_HOST || "localhost:50051";

const client = new bookProto.BookService(
  BOOKS_GRPC_HOST,
  grpc.credentials.createInsecure()
);

export const checkBookExists = (bookId) => {
  return new Promise((resolve, reject) => {
    client.CheckBookExists({ bookId }, (error, response) => {
      if (error) {
        return reject(error);
      }

      resolve(response);
    });
  });
};