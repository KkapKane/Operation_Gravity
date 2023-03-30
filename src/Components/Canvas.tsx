import Matter, { Bodies, Body, Engine, Render, Runner, World } from "matter-js";
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
import MatterAttractorsF from "matter-attractors-f"
import { useRef, useEffect } from "react";

export default function Canvas() {
  Matter.use(MatterAttractorsF);

 let countries = [
   { name: "UnitedStates", img: UnitedStates },
   { name: "China", img: China },
   { name: "Japan", img: Japan },
   { name: "Germany", img: Germany },
   { name: "India", img: India },
   { name: "UnitedKingdom", img: UnitedKingdom },
   { name: "France", img: France },
   { name: "Brazil", img: Brazil },
   { name: "Italy", img: Italy },
   { name: "Canada", img: Canada },
   { name: "SouthKorea", img: SouthKorea },
   { name: "Russia", img: Russia },
   { name: "Australia", img: Australia },
   { name: "Spain", img: Spain },
   { name: "Mexico", img: Mexico },
   { name: "Indonesia", img: Indonesia },
   { name: "Turkey", img: Turkey },
   { name: "Netherlands", img: Netherlands },
   { name: "Switzerland", img: Switzerland },
   { name: "SaudiArabia", img: SaudiArabia },
   { name: "Taiwan", img: Taiwan },
   { name: "Poland", img: Poland },
   { name: "Sweden", img: Sweden },
   { name: "Belgium", img: Belgium },
   { name: "Argentina", img: Argentina },
   { name: "Thailand", img: Thailand },
 ];

  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engine = useRef(Engine.create());
  const runner = useRef(Runner.create());
  
  

  


 

  useEffect(() => {
    //render runs continuously 
    const render = Render.create({
      element: boxRef.current!,
      engine: engine.current,
      canvas: canvasRef.current!,
      options: {
        width: 1600,
        height: 800,
        background: "white",
        wireframes: false,
      },
    });

    Runner.run(runner.current, engine.current);
    Render.run(render);

    var world = engine.current.world;
    world.gravity.scale = 0;
    engine.current.timing.timeScale = 1;

    for (let i = 0; i < countries.length; i++) {
      const country = 
        Bodies.circle(800, 400, 29, {
          isStatic: false,
          label: countries[i].name,
          
          render:{
           sprite:{
            texture: countries[i].img,
            xScale: 1,
            yScale: 1,
           }
          }
        })

        World.add(world, country)
      
    }



    const cleanup = () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner.current);
    };

    return cleanup;
  }, []);

  const addForce = (country: string) => {
    let bodiesArray = engine.current.world.bodies
    
  let biggestRadius = bodiesArray[0]
    let countryObject = bodiesArray.find((o) => o.label === country);
    if(!countryObject) return
    
   // sets all the bodies static to false at the beginning of the function
    for(let i = 0; i < bodiesArray.length; i++ ){
      Body.setStatic(bodiesArray[i], false)
    }


    // makes the ball's body and sprite scale up 1.5
     Body.scale(countryObject, 1.5, 1.5);
     if(!countryObject.render.sprite) return
     countryObject.render.sprite.xScale = countryObject.render.sprite?.xScale * 1.5
     countryObject.render.sprite.yScale = countryObject.render.sprite?.yScale * 1.5

    // finds the body with the biggest mass
    if(!biggestRadius.circleRadius) return
    for(let i = 0 ; i < bodiesArray.length; i++) {
      if(biggestRadius.circleRadius <= bodiesArray[i].circleRadius){
        biggestRadius = bodiesArray[i]
       
      }
         
     }
     

     // sets the body with biggest radius to static position

     for(let i = 0; i < bodiesArray.length; i++){
      if(bodiesArray[i] == biggestRadius){
        Body.setStatic(bodiesArray[i], true)
      } else {
        Body.setStatic(bodiesArray[i], false)
      }
     }


     console.log(engine.current.world.bodies)
   
    
    let gravitationalForce = function (bodyA: any, bodyB: any) {
      let distance = Matter.Vector.magnitude(
        Matter.Vector.sub(bodyA.position, bodyB.position)
      );
      if (distance < 100) {
        
        return;
      }

      let force = {
        x: (bodyA.position.x - bodyB.position.x) * 1e-5,
        y: (bodyA.position.y - bodyB.position.y) * 1e-5,
      };
      // only apply force if the main body's radius is bigger than everything else
      if (bodyA.circleRadius > bodyB.circleRadius) {
        Body.applyForce(bodyA, bodyA.position, Matter.Vector.neg(force));
        Body.applyForce(bodyB, bodyB.position, force);
      }
    };
    // pushing gravitationalForce function into the specific ball's attractor array
    countryObject.plugin.attractors.push(gravitationalForce);

  

   
  };

 

  return (
    <div ref={boxRef}>
      <canvas ref={canvasRef} style={{height: "100%", width: "100%"}}/>
      <button onClick={() => addForce("India")}>ball 1 higher gravitational pull</button>
      <button onClick={() => addForce("Russia")}>ball 1 higher gravitational pull</button>
      <button onClick={() => addForce("UnitedStates")}>ball 1 higher gravitational pull</button>
     
    </div>
  );
}
