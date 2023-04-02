
import { Bodies, Body, World } from "matter-js";


export class CountryBall {
  name: string;
  posX: number;
  posY: number;
  r: number;
  imgSrc: string;
  body: Body;
  world: World;

  constructor(
    name: string,
    posX: number,
    posY: number,
    r: number,
    imgSrc: string,
    world: World
  ) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
    this.r = r;
    this.imgSrc = imgSrc;
    this.world = world;
    this.body = Bodies.circle(posX, posY, r, {
      isStatic: false,
      label: this.name,
      collisionFilter:{ 
        mask: 1
      },
      render: {
        sprite: {
          texture: this.imgSrc,
          xScale: 1,
          yScale: 1,
        },
      },
    });
    World.add(world, this.body);
  }

 
}
