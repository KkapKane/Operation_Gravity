import Matter, {
  Bodies,
  Body,
  Engine,
  Render,
  Runner,
  Vector,
  World,
} from "matter-js";
import * as p5 from "p5";
import UnitedStates from "../assets/UnitedStates.svg";
import China from "../assets/China.svg";
import Japan from "../assets/Japan.svg";
import Germany from "../assets/Germany.svg";
import India from "../assets/India.svg";
import UnitedKingdom from "../assets/UnitedKingdom.svg";
import France from "../assets/France.svg";
import Brazil from "../assets/Brazil.svg";
import Italy from "../assets/Italy.svg";
import Canada from "../assets/Canada.svg";
import SouthKorea from "../assets/SouthKorea.svg";
import Russia from "../assets/Russia.svg";
import Australia from "../assets/Australia.svg";
import Spain from "../assets/Spain.svg";
import Mexico from "../assets/Mexico.svg";
import Indonesia from "../assets/Indonesia.svg";
import Turkey from "../assets/Turkey.svg";
import Netherlands from "../assets/Netherlands.svg";
import Switzerland from "../assets/Switzerland.svg";
import SaudiArabia from "../assets/SaudiArabia.svg";
import Taiwan from "../assets/Taiwan.svg";
import Poland from "../assets/Poland.svg";
import Sweden from "../assets/Sweden.svg";
import Belgium from "../assets/Belgium.svg";
import Argentina from "../assets/Argentina.svg";
import Thailand from "../assets/Thailand.svg";

//@ts-expect-error.
import MatterAttractorsF from "matter-attractors-f";
import { useRef, useEffect } from "react";

import { CountryBall } from "../Classes/Country";

export default function Canvas() {
  Matter.use(MatterAttractorsF);

  let countries = [
    {
      name: "UnitedStates",
      img: UnitedStates,
      initialPosition: { x: 700, y: 300 },
    },
    { name: "China", img: China, initialPosition: { x: 500, y: 300 } },
    { name: "Japan", img: Japan, initialPosition: { x: 600, y: 100 } },
    { name: "Germany", img: Germany, initialPosition: { x: 400, y: 200 } },
    { name: "India", img: India, initialPosition: { x: 900, y: 300 } },
    {
      name: "UnitedKingdom",
      img: UnitedKingdom,
      initialPosition: { x: 300, y: 300 },
    },
    { name: "France", img: France, initialPosition: { x: 400, y: 100 } },
    { name: "Brazil", img: Brazil, initialPosition: { x: 700, y: 500 } },
    { name: "Italy", img: Italy, initialPosition: { x: 500, y: 200 } },
    { name: "Canada", img: Canada, initialPosition: { x: 700, y: 200 } },
    { name: "SouthKorea", img: SouthKorea, initialPosition: { x: 600, y: 50 } },
    { name: "Russia", img: Russia, initialPosition: { x: 1000, y: 100 } },
    { name: "Australia", img: Australia, initialPosition: { x: 900, y: 500 } },
    { name: "Spain", img: Spain, initialPosition: { x: 400, y: 300 } },
    { name: "Mexico", img: Mexico, initialPosition: { x: 700, y: 400 } },
    { name: "Indonesia", img: Indonesia, initialPosition: { x: 1000, y: 400 } },
    { name: "Turkey", img: Turkey, initialPosition: { x: 800, y: 200 } },
    {
      name: "Netherlands",
      img: Netherlands,
      initialPosition: { x: 300, y: 200 },
    },
    {
      name: "Switzerland",
      img: Switzerland,
      initialPosition: { x: 300, y: 100 },
    },
    {
      name: "SaudiArabia",
      img: SaudiArabia,
      initialPosition: { x: 900, y: 200 },
    },
    { name: "Taiwan", img: Taiwan, initialPosition: { x: 600, y: 150 } },
    { name: "Poland", img: Poland, initialPosition: { x: 400, y: 250 } },
    { name: "Sweden", img: Sweden, initialPosition: { x: 300, y: 150 } },
    { name: "Belgium", img: Belgium, initialPosition: { x: 400, y: 150 } },
    { name: "Argentina", img: Argentina, initialPosition: { x: 700, y: 600 } },
    { name: "Thailand", img: Thailand, initialPosition: { x: 1000, y: 300 } },
  ];

  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());

  var Gravity = 100;

  useEffect(() => {
    //render runs continuously
    const render = Render.create({
      element: boxRef.current!,
      engine: engine.current,
      canvas: canvasRef.current!,
      options: {
        width: 1600,
        height: 800,
        background: "grey",
        wireframes: false,
      },
    });

    Runner.run(runner.current, engine.current);
    Render.run(render);

    var world = engine.current.world;
    world.gravity.scale = 0;
    engine.current.timing.timeScale = 1;

    for (let i = 0; i < countries.length; i++) {
      new CountryBall(
        countries[i].name,
        countries[i].initialPosition.x,
        countries[i].initialPosition.y,
        29,
        countries[i].img,
        world
      );
    }

    const cleanup = () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner.current);
    };

    return cleanup;
  }, []);

  // Find the country object in the bodiesArray
  function findCountryObject(
    country: string,
    bodiesArray: Body[]
  ): Body | undefined {
    return bodiesArray.find((o) => o.label === country);
  }

  // Find the body with the biggest radius in the bodiesArray
  function findBiggestRadiusBody(bodiesArray: Body[]): Body | undefined {
    let biggestRadius = bodiesArray[0];
    for (let i = 0; i < bodiesArray.length; i++) {
      if (biggestRadius.circleRadius <= bodiesArray[i].circleRadius) {
        if (biggestRadius !== bodiesArray[i]) {
          // Remove gravitational force from old biggestRadius
          const oldAttractorIndex = biggestRadius.plugin.attractors.indexOf(
            applyUniversalGravitation
          );
          if (oldAttractorIndex !== -1) {
            biggestRadius.plugin.attractors.splice(oldAttractorIndex, 1);
          }
          // Turn on collisions for the old biggestRadius body
          biggestRadius.collisionFilter = {};
        }
        biggestRadius = bodiesArray[i];
      } else {
        // Turn on collisions for other bodies
        bodiesArray[i].collisionFilter = {};
      }
    }

    return biggestRadius;
  }

  // Update the position of the bodies based on the new center
  function updateBodiesPosition(
    newCenter: Vector,
    biggestRadius: Body,
    bodiesArray: Body[]
  ) {
    const displacement = Vector.sub(newCenter, biggestRadius.position);
    for (let i = 0; i < bodiesArray.length; i++) {
      if (bodiesArray[i] == biggestRadius) {
        Body.setPosition(bodiesArray[i], newCenter);
      } else {
        bodiesArray[i].plugin.attractors.pop();
        const newPosition = Vector.add(bodiesArray[i].position, displacement);
        Body.setPosition(bodiesArray[i], newPosition);
      }
    }
  }

  // Apply the universal gravitation force between bodies
  function applyUniversalGravitation(bodyA: Body, bodyB: Body) {
    const r = Matter.Vector.magnitude(
      Matter.Vector.sub(bodyA.position, bodyB.position)
    );
    const f = Matter.Vector.sub(bodyA.position, bodyB.position);
    const oldMass = bodyA.mass;
    const v = Math.sqrt((Gravity * oldMass) / r);
    // 90deg angular velocity
    const v_tan = Matter.Vector.rotate(f, Math.PI / 2);
    const velocity = Matter.Vector.mult(Matter.Vector.normalise(v_tan), v);
    Matter.Body.setVelocity(bodyB, velocity);
  }

  // Main function
 function orbit(country: string) {
   const bodiesArray = engine.current.world.bodies;
   const countryObject = findCountryObject(country, bodiesArray);
   if (!countryObject) return;
   scaleCountryBall(countryObject);

   const biggestRadius = findBiggestRadiusBody(bodiesArray);
   if (!biggestRadius || !biggestRadius.circleRadius) return;

   // Turn off collisions for the biggestRadius body
   biggestRadius.collisionFilter = {
     group: -1,
     category: -1,
   };

   const newCenter = Vector.create(800, 400);
   updateBodiesPosition(newCenter, biggestRadius, bodiesArray);

   // Add gravitational force to new biggestRadius
   const attractorIndex = biggestRadius.plugin.attractors.indexOf(
     applyUniversalGravitation
   );
   if (attractorIndex === -1) {
     biggestRadius.plugin.attractors.push(applyUniversalGravitation);
   }

   // Turn off gravitational force for other bodies
   for (let i = 0; i < bodiesArray.length; i++) {
     if (bodiesArray[i] !== biggestRadius) {
       const attractorIndex = bodiesArray[i].plugin.attractors.indexOf(
         applyUniversalGravitation
       );
       if (attractorIndex !== -1) {
         bodiesArray[i].plugin.attractors.splice(attractorIndex, 1);
       }
     }
   }
 }
  function scaleCountryBall(countryObject) {
    if (!countryObject) return;
    Body.scale(countryObject, 1.5, 1.5);
    if (!countryObject.render.sprite) return;
    countryObject.render.sprite.xScale =
      countryObject.render.sprite?.xScale * 1.5;
    countryObject.render.sprite.yScale =
      countryObject.render.sprite?.yScale * 1.5;
  }

  return (
    <div
      ref={boxRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
      }}
    >
      <canvas ref={canvasRef} />
      <button onClick={() => orbit("India")}>India</button>
      <button onClick={() => orbit("UnitedStates")}>USA</button>
      <button onClick={() => orbit("Japan")}>Japan</button>
      <button onClick={() => orbit("China")}>China</button>
    </div>
  );
}
