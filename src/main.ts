import { Application, Graphics, FederatedPointerEvent } from "pixi.js";




(async () => {
  let dragging = false;

  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });
  app.stage.eventMode = "static"; // Makes the Graphics object interactive
  app.stage.hitArea = app.screen;
  
  const leftX = app.screen.width /4;
  const rightX = app.screen.width - leftX;
  const halfHeight = app.screen.height / 2;
  
  const onDragStart = () => {
    dragging = true;
    app.stage.setChildIndex(leftCircle, app.stage.children.length - 1);
  };

  const onDragEnd = () => {
    dragging = false;

    leftCircle.x = leftX;
    leftCircle.y = halfHeight;
    outer.visible = true;
  };

  const onDragMove = (event: FederatedPointerEvent) => {
    if (dragging) {
      const globalPosition = event.global; // Get global pointer position
      leftCircle.x = globalPosition.x;
      leftCircle.y = globalPosition.y;
    }
  };
  app.stage.on("pointerdown", () => {
    outer.visible = !outer.visible;
  });

 

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  // document.body.appendChild(app.canvas);

  // Create Graphics objects
  const leftCircle = new Graphics();
  const rightCircle = new Graphics();
  const outer = new Graphics();

 

  leftCircle.x = leftX;
  leftCircle.y = halfHeight;
  rightCircle.x = rightX;
  rightCircle.y = halfHeight;

  const radius = leftCircle.x;
  const smallRadius = radius/5;
  leftCircle.cursor = "pointer"; // Changes cursor to pointer on hover



 

  leftCircle.eventMode = "static";

  leftCircle
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragMove);

  outer.circle(leftX, halfHeight, radius);
  outer.circle(rightX, halfHeight, radius/3);
  outer.fill("red");

  leftCircle.circle(0, 0, smallRadius);
  rightCircle.circle(0, 0, smallRadius);

  // Fill the circles with color
  leftCircle.fill("yellow");
  rightCircle.fill("yellow"); 
  

  app.stage.addChild(outer, leftCircle, rightCircle);
  
})();
