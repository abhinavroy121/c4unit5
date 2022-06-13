const express = require("express");
const { News, connection } = require("./news");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res) =>{
    res.send("Welcome to home page")
})

app.get("/news/get", async (req, res) => {
    const pageSize=req.query.pageSize;
    const pageNo = req.query.pageNo;
   const params = req.query.params

  const news = await (await News.find({params}).limit(pageSize));
  return res.json(news);
})

app.post("/news/new",async (req, res) => {
 try{
    const news = await new News({ ...req.body });
    //   console.log(news)
      news.save()
       res.json(news)
 }
 catch(err) {console.log(err, "error occured while reading")}
});

app.put("/:ID", async (req, res) => {
    const { ID } = req.params;
    await News.findByIdAndUpdate(ID, req.body);
    res.status(200).send("Updated the news");
  });

// app.put("/news/:id", (req, res) => {
//   const update = req.body;
//   const news = News.findByIdAndUpdate(req.body, update, { new: true })
//     .then(() => {
//         news.f()
//         res.json(news)
//     })
//     .catch((err) => console.log(err, "error occured while reading"));
// });

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected To http://localhost:8080/news/get");
  } catch {
    console.log("failed to connect to db");
  }
});