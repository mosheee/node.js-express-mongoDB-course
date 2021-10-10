import request from "request"

export const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoibW9zaGUtYnJhdW5zaHRlaW4iLCJhIjoiY2t1OXBlY3lpMDkydzJ1bXY2ZmllMzA2cyJ9.Jmcth5jHzgy76pz3D_BSuQ'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to server', undefined)
        } else if (body.message) {
            callback('type a place', undefined)
        } else if (body.features.length === 0){
            callback('the place is invalide, type another place',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            })
        }
    })
}
