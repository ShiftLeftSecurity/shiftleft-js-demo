const MongoDBClient = require('./src/DB/MongoDBClient')
const timeoutRef = setTimeout(console.log, 20000)

function initDB () {
  new MongoDBClient().connect(async function (err, client) {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    const db = client.db('tarpit', { returnNonCachedInstance: true })

    await createUsers(db)
    clearTimeout(timeoutRef)
    console.log('Database initialized')

    console.log(await db.stats())

    await client.close()
  })
}
setTimeout(initDB, 10000)

async function createUsers (db) {
  /* JSON Generated from https://next.json-generator.com
    [
      {
        'repeat(10)': {
          _id: '{{objectId()}}',
          age: '{{integer(20, 40)}}',
          firstName: '{{firstName()}}',
          lastName: '{{surname()}}',
          company: '{{company().toUpperCase()}}',
          email(tags) {
            return `${this.firstName}.${this.lastName}@${this.company}${tags.domainZone()}`.toLowerCase();
          },
          phone: '+1 {{phone()}}',
          address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}',
          zipCode: '{{integer(100, 10000)}}',
          creditCard: '{{guid()}}',
          username() {
            return `${this.lastName}_${this.firstName}`;
          },
          password: '{{lorem(1, "words")}}'
        }
      }
    ]
  */

  try {
    const collection = await db.collection('users').drop()
  } catch (ex) {
    console.error(ex)
  }
  return await db.collection('users').insertMany([
    {
      _id: '5da7676ce86f5ea81ff1a6b9',
      age: 27,
      firstName: 'Alexis',
      lastName: 'Hopper',
      company: 'OBLIQ',
      email: 'alexis.hopper@obliq.net',
      phone: '+1 (925) 494-3355',
      address: '356 Essex Street, Defiance, Washington',
      zipCode: 6847,
      creditCard: '8067e0fa-6257-4c3b-ad65-3be58407aec9',
      username: 'Hopper_Alexis',
      password: 'velit'
    },
    {
      _id: '5da7676ca2d1bd0af6c2d1ea',
      age: 24,
      firstName: 'Austin',
      lastName: 'Bean',
      company: 'PANZENT',
      email: 'austin.bean@panzent.org',
      phone: '+1 (976) 478-3057',
      address: '829 Regent Place, Slovan, Wisconsin',
      zipCode: 4308,
      creditCard: '53f17923-8570-47aa-8dfb-cf0a06960c24',
      username: 'Bean_Austin',
      password: 'velit'
    },
    {
      _id: '5da7676cf60eb4346135eba2',
      age: 38,
      firstName: 'Stefanie',
      lastName: 'Mcconnell',
      company: 'GEEKY',
      email: 'stefanie.mcconnell@geeky.com',
      phone: '+1 (812) 410-2261',
      address: '703 Bryant Street, Blende, New Mexico',
      zipCode: 3923,
      creditCard: '2fe32288-1170-4473-90a0-bc9dda35808d',
      username: 'Mcconnell_Stefanie',
      password: 'adipisicing'
    },
    {
      _id: '5da7676c9e2211a2d5666fb4',
      age: 20,
      firstName: 'Joyner',
      lastName: 'Taylor',
      company: 'NEBULEAN',
      email: 'joyner.taylor@nebulean.tv',
      phone: '+1 (870) 587-3097',
      address: '223 Ross Street, Irwin, Kansas',
      zipCode: 6212,
      creditCard: '11f4cf91-8bfa-4b7d-bf0e-c62a1a7a4cdc',
      username: 'Taylor_Joyner',
      password: 'reprehenderit'
    },
    {
      _id: '5da7676c9a90e183896faaad',
      age: 22,
      firstName: 'Sawyer',
      lastName: 'Singleton',
      company: 'SCENTY',
      email: 'sawyer.singleton@scenty.biz',
      phone: '+1 (976) 458-2882',
      address: '197 McKibbin Street, Golconda, Arkansas',
      zipCode: 6751,
      creditCard: '2ed79a48-ba3e-4765-9e38-4485a5ef477d',
      username: 'Singleton_Sawyer',
      password: 'ut'
    },
    {
      _id: '5da7676cb7a174cbfab07a2f',
      age: 37,
      firstName: 'Potts',
      lastName: 'Mccullough',
      company: 'FURNAFIX',
      email: 'potts.mccullough@furnafix.io',
      phone: '+1 (806) 527-3795',
      address: '980 Amity Street, Tecolotito, Vermont',
      zipCode: 9137,
      creditCard: 'e0051644-143c-4b9f-a880-3de60663261d',
      username: 'Mccullough_Potts',
      password: 'veniam'
    },
    {
      _id: '5da7676ca1c04e3c74a0eff2',
      age: 38,
      firstName: 'English',
      lastName: 'Daniels',
      company: 'SUPPORTAL',
      email: 'english.daniels@supportal.biz',
      phone: '+1 (890) 514-2523',
      address: '842 Herkimer Place, Lithium, Montana',
      zipCode: 7104,
      creditCard: 'b35e26be-d1c9-4a88-9bb0-61cbb33acdea',
      username: 'Daniels_English',
      password: 'minim'
    },
    {
      _id: '5da7676c60b6aa83b1f1f164',
      age: 35,
      firstName: 'Allison',
      lastName: 'Mullen',
      company: 'ONTALITY',
      email: 'allison.mullen@ontality.ca',
      phone: '+1 (842) 422-2577',
      address: '431 Rockwell Place, Roderfield, Maryland',
      zipCode: 9920,
      creditCard: '4296a5ff-40e3-4557-964e-6cf9920d07e6',
      username: 'Mullen_Allison',
      password: 'veniam'
    },
    {
      _id: '5da7676c4ff7bf4248309e3b',
      age: 27,
      firstName: 'Hansen',
      lastName: 'Farmer',
      company: 'METROZ',
      email: 'hansen.farmer@metroz.me',
      phone: '+1 (934) 447-3223',
      address: '866 Mill Street, Stockdale, Alaska',
      zipCode: 5357,
      creditCard: '7ef425ef-b7e7-447a-b7fa-8982ac09000a',
      username: 'Farmer_Hansen',
      password: 'dolore'
    },
    {
      _id: '5da7676c8197615bddd87f5d',
      age: 38,
      firstName: 'Monica',
      lastName: 'Stein',
      company: 'KAGE',
      email: 'monica.stein@kage.name',
      phone: '+1 (911) 560-2497',
      address: '989 Radde Place, Alleghenyville, Maine',
      zipCode: 5691,
      creditCard: '2ef14544-ab4c-4814-8968-9242f1e26a83',
      username: 'Stein_Monica',
      password: 'ipsum'
    }
  ])
}
