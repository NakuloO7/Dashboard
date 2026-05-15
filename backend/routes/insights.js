const express = require('express')
const router = express.Router();

const Insight = require('../models/Insight');



//this get route will filter all the entries based on the query search 
// for eg : /api/insights?sector=Energy 
//will return all the data related to the energy sector
router.get('/', async(req, res)=>{
    try {
        const {
            end_year,
            topic,
            sector,
            region,
            pestle,
            source,
            country
        } = req.query;

        const filter = {};

        if(end_year) 
          filter.end_year = end_year;

        if(topic)
            filter.topic = topic;

        if(sector)
            filter.sector = sector;
        
        if(region)
            filter.region = region;

        if(pestle)
            filter.pestle = pestle;

        if(source)
            filter.source = source;

        if(country)
            filter.country = country;

        const insights = await Insight.find(filter);

        res.status(200).json(insights);    
        
    } catch (error) {
        res.status(500).json({
           message: error.message,
        });
    }
})


router.get('/filters', async(req, res)=>{
    try {
  
        const [endYears, topics, sectors, regions, pestles, sources, countries] = await Promise.all([
            Insight.distinct("end_year"),
            Insight.distinct("topic"),
            Insight.distinct("sector"),
            Insight.distinct("region"),
            Insight.distinct("pestle"),
            Insight.distinct("source"),
            Insight.distinct("country"),
        ]);

        //distint will return unique values [Energy, Manufacturing, Energy, Government, Energy] = [Energy, Manufacturing, Government] 

        res.status(200).json({
            endYears : endYears.filter(Boolean).sort(),
            topics : topics.filter(Boolean).sort(),
            sectors : sectors.filter(Boolean).sort(),
            regions : regions.filter(Boolean).sort(),
            pestles : pestles.filter(Boolean).sort(),
            sources : sources.filter(Boolean).sort(),
            countries : countries.filter(Boolean).sort()
        })


    } catch (error) {
        res.status(500).json({
            message : error.message
        })
    }
})

module.exports = router;