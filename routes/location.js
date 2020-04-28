const router = require('express').Router()
const turf = require('@turf/turf')
const verify = require('./authentication/verifyToken')
const Location = require('../model/Location')
const User = require('../model/User')

router.post('/add_new', verify, async (req, res) => {
    const permission_needed = 5;
    //TO-DO check if user is priviliged to add locations
    const user = await User.findOne({
        _id: req.user._id
    });

    if (user.permissions != permission_needed) return res.status(400).send({
        error: "No permission to create new Location!",
        permission_needed: permission_needed,
        user_permission: user.permissions
    })

    //Check if Location exists
    const locationExists = await Location.findOne({
        name: req.body.name,
        street: req.body.street,
        zip: req.body.zip,
    })
    if (locationExists) return res.status(400).send({
        error: "Location already Exists",
        _id: locationExists._id,
        user: req.user
    })


    //Creating new Location
    const location = new Location({
        public: req.body.public,
        owner: req.body.owner,
        name: req.body.name,
        street: req.body.street,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country,
        lon: req.body.lon,
        lat: req.body.lat
    })

    try {
        const savedLocation = await location.save()
        return res.send({
            location_id: location._id
        })
    } catch (err) {
        return res.status(400).send(err)
    }
})

//Find nearby Locations, depending on GPS Coords of user and radius
//max radius= 2000
router.get('/nearby_search', verify, async (req, res) => {
    const lat = req.query.lat
    const lon = req.query.lon
    const radius = req.query.radius

    console.log(req.query)

    if (radius > 2000) return res.status(400).send({
        err: "Radius to big => max Radius: 2000 (in meters)",
        radius: radius
    })

    const pos = turf.point([lat, lon])
    const distance = ((2 * radius * Math.sqrt(2)) / 2) / 1000
    const bearings = [45, 135, 225, 315]
    let borderPoints = []

    console.log(distance)

    bearings.forEach(bearing => {
        borderPoints.push(turf.destination(pos, distance, bearing))
    });
    const filter = {
        lat: {
            $lt: (borderPoints[0].geometry.coordinates[0] + borderPoints[1].geometry.coordinates[0]) / 2,
            $gt: (borderPoints[2].geometry.coordinates[0] + borderPoints[3].geometry.coordinates[0]) / 2

        },
        lon: {
            $lt: (borderPoints[0].geometry.coordinates[1] + borderPoints[3].geometry.coordinates[1]) / 2,
            $gt: (borderPoints[1].geometry.coordinates[1] + borderPoints[2].geometry.coordinates[1]) / 2
        }
    }

    var query = await Location.find(filter);
    let result = []
    query.forEach(location => {
        let distanceInMeters = 1000 * turf.distance(pos, turf.point([location.lat, location.lon], {
            units: 'kilometers'
        }))
        if (distanceInMeters <= radius) {
            result.push({
                name: location.name,
                distance: Math.round(distanceInMeters),
                coordinates: {
                    lat: location.lat,
                    lon: location.lon
                }
            })
        }
    });

    console.log(filter)
    console.log(result);

    if (result) {
        return res.status(200).send({
            results: result,
            timestamp: Date.now
        })
    } else return

})

module.exports = router;