

  const app = require('../../../util/configureAPI');
  const Cache = require('../../../models/Cache');
  const connectDB = require('../../../util/db');
  
  app.put('*', (req, res) => {
    connectDB()
      .then(() => {
        const { _id } = req.query;
  
        if (!_id) throw new Error('No id specified');
        
          return Cache.findOneAndDelete(
            {_id},
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
    
  });
  
  module.exports = app;