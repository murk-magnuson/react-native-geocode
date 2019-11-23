

  const app = require('../../../util/configureAPI');
const Cache = require('../../../models/Cache');
const connectDB = require('../../../util/db');

app.put('*', (req, res) => {
  connectDB()
    .then(() => {
      const { _id } = req.query;

      if (!_id) throw new Error('No id specified');
      
        return Cache.findOneAndUpdate(
          {_id},
          {
            $set: {foundCount: 0}
          },
          {
            useFindAndModify: true,
            new: true
          }
        )
      
      
     
    })
    .then(cacheItem => {
      res.status(200).json({
        result: cacheItem
      });
    })
    .catch(err => {
      res.status(err.statusCode || 500).json({
        error: err.message
      })
    })
  //res.status(200).json({
 //     result: {},
   //   okay: true
  //})
});

module.exports = app;