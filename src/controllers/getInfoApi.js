const axios = require('axios')
const { Country, Activity } = require('../db')

const getApiInfo = async () => {
  try {
    const apiData = await axios('https://restcountries.com/v3/all')
    const countriesInfo = apiData.data.map((c) => {
      return {
        id: c.cca3,
        name: c.name.common,
        flag: c.flags[0],
        continent: c.continents[0],
        capital: c.capital != null ? c.capital : 'No se encontro capital',
        subregion: c.subregion,
        area: c.area,
        population: c.population
      }
    })
    const saveInDbOrCreate = () => {
      countriesInfo.map(i => {
        Country.findOrCreate({
          where: {
            name: i.name,
            id: i.id
          },
          defaults: {
            continent: i.continent,
            flag: i.flag,
            capital: i.capital,
            subregion: i.subregion,
            area: i.area,
            population: i.population
          }
        }).catch((err) => { console.log(err) });
      })
    }
    // console.log(countriesInfo)
    saveInDbOrCreate()
    return countriesInfo
  } catch {
    res.send('Error getting info to countries')
  }
}

const getDbInfo = async () => {
  await getApiInfo()
  const aux = await Country.findAll({
    include: {
      model: Activity,
      attributes: ['name', 'difficulty', 'duration', 'season'],
      through: {
        attributes: [],
      }
    }
  })
  return aux
}

const getActivities = async () => {
  const getAct = await Activity.findAll()
  console.log(getAct)
  return getAct;
}




module.exports = { getDbInfo, getActivities };