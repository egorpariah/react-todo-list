import express from 'express';
import methodOverride from 'method-override';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  createTaskInDatabase,
  readTasksFromDatabase,
  updateTaskInDatabase,
  deleteTaskFromDatabase,
} from './mysql.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const app = express();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = path.join(__dirname, `/uploads/${req.body.id}`);

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.json());

app.use('/uploads', express.static(`${__dirname}/uploads`));

app.post('/create', upload.array('newFiles'), async (req, res, next) => {
  const task = { ...req.body };
  task.files = req.files.map(file => file.filename);
  await createTaskInDatabase(task);
  res.status(200).send('Task created');
  next();
});

app.get('/read', async (req, res, next) => {
  const tasks = await readTasksFromDatabase();
  res.status(200).json(tasks);
  next();
});

app.put('/update', upload.array('newFiles'), async (req, res, next) => {
  const task = { ...req.body };
  fs.readdir(path.join(__dirname, `/uploads/${req.body.id}`), (err, files) => {
    if (!files) return;
    const deletedFiles = files.filter(
      file => req.body.files.indexOf(file) === -1
    );
    for (const file of deletedFiles) {
      fs.rmSync(path.join(__dirname, `/uploads/${req.body.id}/${file}`));
    }
  });
  await updateTaskInDatabase(task);
  res.status(200).send('Task updated');
  next();
});

app.delete('/delete/:id', async (req, res, next) => {
  await deleteTaskFromDatabase(req.params.id);
  fs.rm(
    path.join(__dirname, `/uploads/${req.params.id}`),
    {
      recursive: true,
    },
    error => {
      if (error) console.log(error);
    }
  );
  res.status(200).send('Task deleted');
  next();
});

app.use((err, req, res, next) => {
  res.status(500).json(err.message);
});

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
