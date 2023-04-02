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
      initialPosition: { x: 800, y: 400 },
    },
    { name: "China", img: China, initialPosition: { x: 500, y: 100 } },
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

  var Gravity = 40;

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

    for (let i = 0; i < 2; i++) {
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

  function setMagnitude(vector: { x: number; y: number }, magnitude: number) {
    // Calculate the current magnitude of the vector
    const currentMagnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);

    // Scale the vector's components by the ratio of the desired magnitude to the current magnitude
    const scaleRatio = magnitude / currentMagnitude;
    const scaledVector = {
      x: vector.x * scaleRatio,
      y: vector.y * scaleRatio,
    };

    return scaledVector;
  }

  const addForce = (country: string) => {
    let bodiesArray = engine.current.world.bodies;

    let biggestRadius = bodiesArray[0];
    let countryObject = bodiesArray.find((o) => o.label === country);
    if (!countryObject) return;

    // sets all the bodies static to false at the beginning of the function
    for (let i = 0; i < bodiesArray.length; i++) {
      Body.setStatic(bodiesArray[i], false);
    }

    // makes the ball's body and sprite scale up 1.5
    scaleCountryBall(countryObject);

    // finds the body with the biggest radius
    if (!biggestRadius.circleRadius) return;
    for (let i = 0; i < bodiesArray.length; i++) {
      if (biggestRadius.circleRadius <= bodiesArray[i].circleRadius) {
        biggestRadius = bodiesArray[i];
      }
    }
    console.log(biggestRadius);

    // sets the body with biggest radius to static position

    for (let i = 0; i < bodiesArray.length; i++) {
      if (bodiesArray[i] == biggestRadius) {
        // Body.setStatic(bodiesArray[i], true)
        Body.setPosition(bodiesArray[i], Vector.create(800, 400));
      } else {
        Body.setStatic(bodiesArray[i], false);
      }
    }

    console.log(engine.current.world.bodies);

    // let universalGravitation = function (bodyA: Body, bodyB: Body) {
    //   let r = Matter.Vector.magnitude(
    //     Matter.Vector.sub(bodyA.position, bodyB.position)
    //   );

    //   let f = Matter.Vector.sub(bodyB.position, bodyA.position);
    //   let forceMagnitude = (Gravity * bodyA.mass * bodyB.mass) / (r * r);
    //   let force = Matter.Vector.mult(
    //     Matter.Vector.normalise(f),
    //     forceMagnitude
    //   );
    //   Body.applyForce(bodyA, bodyA.position, force);

    // };
    // if (countryObject)
    // // pushing universalGravitation function into the specific ball's attractor array
    //   countryObject.plugin.attractors.push(universalGravitation);
  };

  function orbit(country: string) {
    let bodiesArray = engine.current.world.bodies;
    let biggestRadius = bodiesArray[0];
    let countryObject = bodiesArray.find((o) => o.label === country);

    // sets all the bodies static to false at the beginning of the function
    for (let i = 0; i < bodiesArray.length; i++) {
      Body.setStatic(bodiesArray[i], false);
    }

    scaleCountryBall(countryObject);

    // finds the body with the biggest radius
    if (!biggestRadius.circleRadius) return;
    for (let i = 0; i < bodiesArray.length; i++) {
      if (biggestRadius.circleRadius <= bodiesArray[i].circleRadius) {
        biggestRadius = bodiesArray[i];
      }
    }

    console.log(biggestRadius);

    // sets the body with biggest radius to static position

    // for (let i = 0; i < bodiesArray.length; i++) {
    //   if (bodiesArray[i] == biggestRadius) {
    //     Body.setStatic(bodiesArray[i], true);
    //     Body.setPosition(bodiesArray[i], Vector.create(800, 400));
    //   } else {
    //     Body.setStatic(bodiesArray[i], false);
    //   }
    // }

    let universalGravitation = function (bodyA: Body, bodyB: Body) {
      const r = Matter.Vector.magnitude(
        Matter.Vector.sub(bodyA.position, bodyB.position)
      );
      const f = Matter.Vector.sub(bodyA.position, bodyB.position);
      const forceMagnitude = (Gravity * bodyA.mass * bodyB.mass) / (r * r);
      const force = Matter.Vector.mult(
        Matter.Vector.normalise(f),
        forceMagnitude
      );

      // Calculate the initial velocity required for circular orbit
      const v = Math.sqrt((Gravity * bodyA.mass) / r);
      const v_tan = Matter.Vector.rotate(f, Math.PI / 2);
      const velocity = Matter.Vector.mult(Matter.Vector.normalise(v_tan), v);
      Matter.Body.setVelocity(bodyB, velocity);
      Body.setPosition(bodyA, Matter.Vector.create(800, 400));

      //  Matter.Body.applyForce(bodyB, bodyB.position, force);
      Matter.Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
    };
    if (countryObject)
      countryObject.plugin.attractors.push(universalGravitation);
    if (countryObject)
      countryObject.plugin.attractors.push(universalGravitation);
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
      <button onClick={() => addForce("India")}>India</button>
      <button onClick={() => addForce("Russia")}>Russia</button>
      <button onClick={() => orbit("Japan")}>Japan</button>
      <button onClick={() => orbit("UnitedStates")}>USA</button>
    </div>
  );
}
