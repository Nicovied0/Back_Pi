const { Router } = require('express')
const router = Router()
const { Country, Activity } = require('../db')
const { getActivities } = require('../controllers/getInfoApi')



router.get('/', async (req, res) => {
  try {
    const getActivity = await getActivities()
    res.status(200).send(getActivity)
  } catch {
    res.status(404).send('Error in get activities')
  }
})


router.post('/', async (req, res) => {
  const { name, difficulty, duration, season, countryId } = req.body
  const createActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
    countryId
  })
  
  const countries = await Country.findAll({
    where: {
      id: countryId
    }
  })
  createActivity.addCountries(countries)
  res.status(200).send(createActivity)

})


module.exports = router;
