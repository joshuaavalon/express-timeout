import express, { json } from "express";
import _ from "lodash";
import path from "path";

const app = express();
const port = 3000;
const publicDir = path.join(__dirname, "public");

app.use(json());
app.post("/api", (req, res, next) => {
  let timeout = 3000;
  try {
    const query = _.parseInt(req.body.timeout);
    if (query > 0) {
      timeout = query * 1000;
    }
  } catch {
    // no-ops
  }
  console.log({ timeout });
  setTimeout(() => {
    res.status(200);
    res.json({ success: true });
    next();
  }, timeout);
});
app.use(express.static(publicDir));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`http://localhost:${port}/`);
});
