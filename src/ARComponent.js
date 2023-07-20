import React, { useEffect, useState } from "react";

const ARComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getGeolocation();
    const aframeScript = document.createElement("script");
    aframeScript.setAttribute(
      "src",
      "https://aframe.io/releases/1.2.0/aframe.min.js"
    );
    document.head.appendChild(aframeScript);

    const arjsScript = document.createElement("script");
    arjsScript.setAttribute(
      "src",
      "https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.min.js"
    );
    document.head.appendChild(arjsScript);

    return () => {
      document.head.removeChild(aframeScript);
      document.head.removeChild(arjsScript);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <a-scene
          vr-mode-ui="enabled: false"
          arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false"
        >
          <a-camera gps-camera gps-tracking-enabled="true"></a-camera>
          <a-entity
            material="color: red"
            geometry="primitive: box"
            gps-entity-place={`latitude: ${latitude}; longitude: ${longitude}`} 
            scale="10 10 10"
          ></a-entity>
        </a-scene>
      )}
    </div>
  );
};

export default ARComponent;
