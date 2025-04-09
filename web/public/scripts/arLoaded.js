const addLocationARLoadedHandler = (handleLoaded) => {
  window.addEventListener(
    // Fired when the origin coordinates are set
    "gps-camera-origin-coord-set",
    () => {
      console.log("origin coordinates set");

      const video = document.querySelector("video");
      const alreadyCanPlay = video.readyState >= 3;

      if (alreadyCanPlay) {
        handleLoaded();
      } else {
        video.addEventListener("canplay", () => {
          handleLoaded();
        });
      }
    }
  );
};

const throwSceneNotFound = () => {
  throw Error(
    "No <a-scene> element found in the document. Make sure to include it in your HTML file."
  );
};

const addFaceARLoadedHandler = (handleLoaded) => {
  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector("a-scene");

    if (!scene) {
      throwSceneNotFound();
    }

    scene.addEventListener("arReady", handleLoaded);
  });
};

const addMarkerARLoadedHandler = (handleLoaded) => {
  document.addEventListener("DOMContentLoaded", () => {
    const scene = document.querySelector("a-scene");

    if (!scene) {
      throwSceneNotFound();
    }

    scene.addEventListener("arReady", handleLoaded);
  });
};

const readaptAllEntityPositions = () => {
  const scene = document.querySelector("a-scene");

  if (!scene) {
    throwSceneNotFound();
  }

  // 1. a-gltf-model을 자식으로 가지고있는 entity를 모두 찾는다
  const entities = scene.querySelectorAll("a-entity");
  const filteredEntities = Array.from(entities).filter(
    (entity) => {
      return entity.querySelector("a-gltf-model");
    }
  );

  console.log("filteredEntities", filteredEntities);

  // 2. 각 entity의 position을 읽어온다
  filteredEntities.forEach((entity) => {
    const position = entity.getAttribute("position");

    console.log(position);

    // 2-1. position이 없으면, 위치를 설정하지 않는다
    if (!position) {
      return;
    }

    console.log(position.x);
    console.log(position.y);
    console.log(position.z);

    const reposition = `${position.x} ${position.y} ${position.z}`;

    // 3. position을 읽어온 후, 다시 설정한다
    entity.setAttribute("position", reposition);

    console.log(
      "set position?",
      entity.getAttribute("position")
    );
  });
};

const addARLoadedHandler = (arType, handler) => {
  if (arType === "location") {
    addLocationARLoadedHandler(() => {
      handler();
      readaptAllEntityPositions();
    });
  } else if (arType === "face") {
    addFaceARLoadedHandler(() => {
      handler();
      readaptAllEntityPositions();
    });
  } else if (arType === "marker") {
    addMarkerARLoadedHandler(() => {
      handler();
      readaptAllEntityPositions();
    });
  }
};
