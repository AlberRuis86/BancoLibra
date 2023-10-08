// const express = require('express');
// const app = express();
// const fs = require('fs');

// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// app.post('/guardarInversion', (req, res) => {
//   const nuevaInversion = req.body;

//   fs.readFile('inversiones.json', (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Error al leer el archivo de inversiones.' });
//     }

//     let inversiones = JSON.parse(data);

//     inversiones.push(nuevaInversion);

//     fs.writeFile('inversiones.json', JSON.stringify(inversiones), (err) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).json({ error: 'Error al escribir en el archivo de inversiones.' });
//       }

//       res.json({ message: 'Inversión guardada con éxito.' });
//     });
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
// });



