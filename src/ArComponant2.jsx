import React, { useRef, useState } from 'react';
import 'aframe';
import { Entity, Scene } from 'aframe-react';
import img from "./img.png"
import dobj from "./assest/bugatti.obj"
const ARComponent = () => {
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const boxRef = useRef();
  const sphereRef = useRef();

  const handleMouseDown = (event) => {
    setMouseDown(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleMouseMove = (event) => {
    if (!mouseDown) return;

    const deltaX = event.clientX - mousePosition.x;
    const deltaY = event.clientY - mousePosition.y;

    const boxPosition = boxRef.current.getAttribute('position');
    const spherePosition = sphereRef.current.getAttribute('position');

    boxRef.current.setAttribute('position', {
      x: boxPosition.x + deltaX * 0.001,
      y: boxPosition.y - deltaY * 0.001,
      z: boxPosition.z,
    });

    sphereRef.current.setAttribute('position', {
      x: spherePosition.x + deltaX * 0.001,
      y: spherePosition.y - deltaY * 0.001,
      z: spherePosition.z,
    });

    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  const handleTouchStart = (event) => {
    setMouseDown(true);
    const touch = event.touches[0];
    setMousePosition({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (event) => {
    if (!mouseDown) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - mousePosition.x;
    const deltaY = touch.clientY - mousePosition.y;

    const boxPosition = boxRef.current.getAttribute('position');
    const spherePosition = sphereRef.current.getAttribute('position');

    boxRef.current.setAttribute('position', {
      x: boxPosition.x + deltaX * 0.001,
      y: boxPosition.y - deltaY * 0.001,
      z: boxPosition.z,
    });

    sphereRef.current.setAttribute('position', {
      x: spherePosition.x + deltaX * 0.001,
      y: spherePosition.y - deltaY * 0.001,
      z: spherePosition.z,
    });

    setMousePosition({ x: touch.clientX, y: touch.clientY });
  };

  return (
    <Scene
      arjs
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {/* Your existing entities */}
      <Entity
        geometry={{ primitive: 'box' }}
        material={{ color: 'blue' }}
        position={{ x: 0, y: 0, z: -1 }}
        ref={boxRef}
      />
      <Entity
        geometry={{ primitive: 'sphere' }}
        material={{ color: 'blue' }}
        position={{ x: 0.5, y: 0, z: -4.5 }}
        ref={sphereRef}
      />

      {/* Add images */}
      <Entity
        geometry={{ primitive: 'plane' }} // Use a plane as the geometry for the image
        material={{ src: img }} // Replace with the actual path to your image
        position={{ x: -2, y: 0, z: -3 }} // Adjust the position of the image as needed
        scale={{ x: 1, y: 1, z: 1 }} // Adjust the scale of the image as needed
      />

      {/* Add the 3D object */}
      <a-entity
        obj-model={{ obj: dobj }} // Replace with the actual path to your obj file
        position={{ x: 2, y: 0, z: -3 }} // Adjust the position of the 3D object as needed
        scale={{ x: 0.2, y: 0.2, z: 0.2 }} // Adjust the scale of the 3D object as needed
      />
    </Scene>
  );
};

export default ARComponent;
