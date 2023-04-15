import Matter, {
  Bodies,
  Body,
  Common,
  Engine,
  Events,
  Mouse,
  Render,
  Runner,
  Vector,
  World,
} from "matter-js";
import { useEffect, useRef, useState } from "react";
//@ts-expect-error.
import MatterAttractorsF from "matter-attractors-f";

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
import { CountryBall } from "../Classes/Country";

export default function Magnetism() {
  Matter.use(MatterAttractorsF);
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());

  let countries = [
    // {
    //   name: "UnitedStates",
    //   img: UnitedStates,
    //   initialPosition: { x: 700, y: 300 },
    // },
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

    if (!render.options.width || !render.options.height) return;
    var attractiveBody = Bodies.circle(
      render.options?.width / 2,
      render.options?.height / 2,
      50,
      {
        isStatic: true,
        render: {
          sprite: {
            texture: UnitedStates,
            xScale: 2,
            yScale: 2,
          },
        },

        // example of an attractor function that
        // returns a force vector that applies to bodyB
        plugin: {
          attractors: [
            function (bodyA: Body, bodyB: Body) {
              return {
                x: (bodyA.position.x - bodyB.position.x) * 1e-5,
                y: (bodyA.position.y - bodyB.position.y) * 1e-5,
              };
            },
          ],
        },
      }
    );

    World.add(world, attractiveBody);

    // add some bodies that to be attracted
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

    // add mouse control
    var mouse = Mouse.create(render.canvas);

    Events.on(engine.current, "afterUpdate", function () {
      if (!mouse.position.x) {
        return;
      }

      // smoothly move the attractor body towards the mouse
      Body.translate(attractiveBody, {
        x: (mouse.position.x - attractiveBody.position.x) * 0.25,
        y: (mouse.position.y - attractiveBody.position.y) * 0.25,
      });
    });

    const cleanup = () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner.current);
    };

    return cleanup;
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
