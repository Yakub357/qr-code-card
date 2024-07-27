import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

// * Setting up the port number for localhost://
const PORT = 8080;

// Getting path for the index.html
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET" && req.url === "/") {
      let filePath = path.join(__dirname, "public", "index.html");
      const data = await fs.readFile(filePath);
      res.setHeader("COntent-Type", "text/html");
      res.write(data);
      res.end();
    } else {
      throw new Error("PAGE NOT FOUND\n404");
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(`Server Error \n${error}`);
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
