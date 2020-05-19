class Sample{

  async sampleData(req, res) {
    const tasks=[

      {
        id:1,
        name:"Task 1",
        completed:false
      },
      {
        id:2,
        name:"Task 2",
        completed:false
      }
    ];

     return res.send(tasks)
}
}

const sample = new Sample();
module.exports = sample;
