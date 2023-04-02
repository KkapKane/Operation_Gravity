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
import { P5CanvasInstance } from "react-p5-wrapper";
import { Bodies, Body, Engine, Runner, World } from "matter-js";
import { CountryBall } from "../Classes/Country";

export default function Sketch(p5: P5CanvasInstance) {
  var box1: Body;
  var world: World;
  var ground: Body;

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

  let countryBalls: any = []


  p5.setup = function () {
    p5.createCanvas(1600, 800);
    let engine = Engine.create();
    world = engine.world;
    box1 = Bodies.rectangle(200, 100, 80, 80);
    ground = Bodies.rectangle(800, 800, 1600, 4, {isStatic: true})
    for(let i = 0; i < countries.length; i++){
        countryBalls.push(new CountryBall(countries[i].name, 0, 0, 39, countries[i].img, world))
    }
    World.add(world,ground)
    Runner.run(engine);
    World.add(world, box1);
  };

  p5.draw = function () {
    p5.background(51);
    p5.rect(box1.position.x, box1.position.y, 80, 80);
    for(let i = 0; i < countryBalls.length; i++){
        countryBalls[i].show(p5);

    }
  };
}
