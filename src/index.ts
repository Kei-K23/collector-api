import config from "config";

import server from "../lib/server";

const PORT = config.get<number>("PORT");

const app = server();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
