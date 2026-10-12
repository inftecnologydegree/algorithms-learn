const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Define o caminho do arquivo baseado na URL requisitada
    let filePath = req.url === '/' ? './public/index.html' : './public' + req.url;
    let extname = String(path.extname(filePath)).toLowerCase();
    
    // Mapeia os tipos de arquivos suportados
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript'
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';

    // Lê e entrega o arquivo solicitado
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if(error.code == 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>Erro 404: Arquivo Não Encontrado</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Erro interno do servidor: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em http://localhost:${PORT}`);
});
