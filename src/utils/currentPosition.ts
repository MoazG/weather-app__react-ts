export function getCurrentPosiion() {
  return new Promise<{ lat: Number; lng: Number }>((resolve, reject) => {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos: GeolocationPosition) {
      let crd = pos.coords;
      let position = { lat: crd.latitude, lng: crd.longitude };
      resolve(position);
    }

    function error(err: GeolocationPositionError) {
      console.error(`ERROR(${err.code}): ${err.message}`);
      reject(err);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  });
}
