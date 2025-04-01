import { Application, Graphics, FederatedPointerEvent } from "pixi.js";

(async () => {
  let dragging = false;

  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);
  // document.body.appendChild(app.canvas);

  // Create Graphics objects
  const leftCircle = new Graphics();
  const rightCircle = new Graphics();
  const outer = new Graphics();

  const circl1_x = app.screen.width / 3;
  const circl2_x = circl1_x * 2;
  const centerY = app.screen.height / 2;

  leftCircle.x = circl1_x;
  leftCircle.y = centerY;
  rightCircle.x = circl2_x;
  rightCircle.y = centerY;

  const radius = 40;
  // leftCircle.interactive = true; // Makes the Graphics object interactive
  leftCircle.cursor = "pointer"; // Changes cursor to pointer on hover

  app.stage.eventMode = "static"; // Makes the Graphics object interactive
  app.stage.hitArea = app.screen;

  app.stage.on("pointerdown", () => {
    outer.visible = !outer.visible;
  });

  const onDragStart = () => {
    dragging = true;
    app.stage.setChildIndex(leftCircle, app.stage.children.length - 1);
  };

  const onDragEnd = () => {
    dragging = false;

    leftCircle.x = circl1_x;
    leftCircle.y = centerY;
    outer.visible = true;
  };

  const onDragMove = (event: FederatedPointerEvent) => {
    if (dragging) {
      const globalPosition = event.global; // Get global pointer position
      leftCircle.x = globalPosition.x;
      leftCircle.y = globalPosition.y;
    }
  };

  leftCircle.eventMode = "static";

  leftCircle
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragMove);

  outer.circle(circl1_x, centerY, radius * 4);
  outer.circle(circl2_x, centerY, radius * 2);
  outer.fill("red");

  leftCircle.circle(0, 0, radius);
  rightCircle.circle(0, 0, radius);

  // Fill the circles with color
  leftCircle.fill("yellow");
  rightCircle.fill("yellow");

  app.stage.addChild(outer, leftCircle, rightCircle);
  
})();