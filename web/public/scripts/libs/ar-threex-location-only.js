!(function (t, e) {
  "object" == typeof exports &&
  "object" == typeof module
    ? (module.exports = e(require("three")))
    : "function" == typeof define && define.amd
    ? define(["three"], e)
    : "object" == typeof exports
    ? (exports.THREEx = e(require("three")))
    : (t.THREEx = e(t.THREE));
})(this, (t) =>
  (() => {
    "use strict";
    var e = {
        381: (e) => {
          e.exports = t;
        },
      },
      i = {};
    function o(t) {
      var n = i[t];
      if (void 0 !== n) return n.exports;
      var s = (i[t] = { exports: {} });
      return e[t](s, s.exports, o), s.exports;
    }
    (o.d = (t, e) => {
      for (var i in e)
        o.o(e, i) &&
          !o.o(t, i) &&
          Object.defineProperty(t, i, {
            enumerable: !0,
            get: e[i],
          });
    }),
      (o.o = (t, e) =>
        Object.prototype.hasOwnProperty.call(t, e)),
      (o.r = (t) => {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(
            t,
            Symbol.toStringTag,
            { value: "Module" }
          ),
          Object.defineProperty(t, "__esModule", {
            value: !0,
          });
      });
    var n = {};
    return (
      (() => {
        o.r(n),
          o.d(n, {
            DeviceOrientationControls: () => l,
            LocationBased: () => i,
            WebcamRenderer: () => s,
          });
        class t {
          constructor() {
            (this.EARTH = 40075016.68),
              (this.HALF_EARTH = 20037508.34);
          }
          project(t, e) {
            return [
              this.lonToSphMerc(t),
              this.latToSphMerc(e),
            ];
          }
          unproject(t) {
            return [
              this.sphMercToLon(t[0]),
              this.sphMercToLat(t[1]),
            ];
          }
          lonToSphMerc(t) {
            return (t / 180) * this.HALF_EARTH;
          }
          latToSphMerc(t) {
            return (
              ((Math.log(
                Math.tan(((90 + t) * Math.PI) / 360)
              ) /
                (Math.PI / 180)) *
                this.HALF_EARTH) /
              180
            );
          }
          sphMercToLon(t) {
            return (t / this.HALF_EARTH) * 180;
          }
          sphMercToLat(t) {
            var e = (t / this.HALF_EARTH) * 180;
            return (
              (180 / Math.PI) *
              (2 *
                Math.atan(
                  Math.exp((e * Math.PI) / 180)
                ) -
                Math.PI / 2)
            );
          }
          getID() {
            return "epsg:3857";
          }
        }
        var e = o(381);
        class i {
          constructor(e, i, o = {}) {
            (this._scene = e),
              (this._camera = i),
              (this._proj = new t()),
              (this._eventHandlers = {}),
              (this._lastCoords = null),
              (this._gpsMinDistance = 0),
              (this._gpsMinAccuracy = 100),
              (this._maximumAge = 0),
              (this._watchPositionId = null),
              this.setGpsOptions(o),
              (this.initialPosition = null),
              (this.initialPositionAsOrigin =
                o.initialPositionAsOrigin || !1);
          }
          setProjection(t) {
            this._proj = t;
          }
          setGpsOptions(t = {}) {
            void 0 !== t.gpsMinDistance &&
              (this._gpsMinDistance =
                t.gpsMinDistance),
              void 0 !== t.gpsMinAccuracy &&
                (this._gpsMinAccuracy =
                  t.gpsMinAccuracy),
              void 0 !== t.maximumAge &&
                (this._maximumAge = t.maximumAge);
          }
          startGps(t = 0) {
            return (
              null === this._watchPositionId &&
              ((this._watchPositionId =
                navigator.geolocation.watchPosition(
                  (t) => {
                    this._gpsReceived(t);
                  },
                  (t) => {
                    this._eventHandlers.gpserror
                      ? this._eventHandlers.gpserror(
                          t.code
                        )
                      : alert(
                          `GPS error: code ${t.code}`
                        );
                  },
                  {
                    enableHighAccuracy: !0,
                    maximumAge:
                      0 != t ? t : this._maximumAge,
                  }
                )),
              !0)
            );
          }
          stopGps() {
            return (
              null !== this._watchPositionId &&
              (navigator.geolocation.clearWatch(
                this._watchPositionId
              ),
              (this._watchPositionId = null),
              !0)
            );
          }
          fakeGps(t, e, i = null, o = 0) {
            null !== i && this.setElevation(i),
              this._gpsReceived({
                coords: {
                  longitude: t,
                  latitude: e,
                  accuracy: o,
                },
              });
          }
          lonLatToWorldCoords(t, e) {
            const i = this._proj.project(t, e);
            if (this.initialPositionAsOrigin) {
              if (!this.initialPosition)
                throw "Trying to use 'initial position as origin' mode with no initial position determined";
              (i[0] -= this.initialPosition[0]),
                (i[1] -= this.initialPosition[1]);
            }
            return [i[0], -i[1]];
          }
          add(t, e, i, o) {
            this.setWorldPosition(t, e, i, o),
              this._scene.add(t);
          }
          setWorldPosition(t, e, i, o) {
            const n = this.lonLatToWorldCoords(e, i);
            void 0 !== o && (t.position.y = o),
              ([t.position.x, t.position.z] = n);
          }
          setElevation(t) {
            this._camera.position.y = t;
          }
          on(t, e) {
            this._eventHandlers[t] = e;
          }
          setWorldOrigin(t, e) {
            this.initialPosition = this._proj.project(
              t,
              e
            );
          }
          _gpsReceived(t) {
            let e = Number.MAX_VALUE;
            t.coords.accuracy <=
              this._gpsMinAccuracy &&
              (null === this._lastCoords
                ? (this._lastCoords = {
                    latitude: t.coords.latitude,
                    longitude: t.coords.longitude,
                  })
                : (e = this._haversineDist(
                    this._lastCoords,
                    t.coords
                  )),
              e >= this._gpsMinDistance &&
                ((this._lastCoords.longitude =
                  t.coords.longitude),
                (this._lastCoords.latitude =
                  t.coords.latitude),
                this.initialPositionAsOrigin &&
                  !this.initialPosition &&
                  this.setWorldOrigin(
                    t.coords.longitude,
                    t.coords.latitude
                  ),
                this.setWorldPosition(
                  this._camera,
                  t.coords.longitude,
                  t.coords.latitude
                ),
                this._eventHandlers.gpsupdate &&
                  this._eventHandlers.gpsupdate(
                    t,
                    e
                  )));
          }
          _haversineDist(t, i) {
            const o = e.MathUtils.degToRad(
                i.longitude - t.longitude
              ),
              n = e.MathUtils.degToRad(
                i.latitude - t.latitude
              ),
              s =
                Math.sin(n / 2) * Math.sin(n / 2) +
                Math.cos(
                  e.MathUtils.degToRad(t.latitude)
                ) *
                  Math.cos(
                    e.MathUtils.degToRad(i.latitude)
                  ) *
                  (Math.sin(o / 2) * Math.sin(o / 2));
            return (
              2 *
              Math.atan2(
                Math.sqrt(s),
                Math.sqrt(1 - s)
              ) *
              6371e3
            );
          }
        }
        class s {
          constructor(t, i) {
            let o;
            (this.renderer = t),
              (this.renderer.autoClear = !1),
              (this.sceneWebcam = new e.Scene()),
              void 0 === i
                ? ((o =
                    document.createElement("video")),
                  o.setAttribute("autoplay", !0),
                  o.setAttribute("playsinline", !0),
                  (o.style.display = "none"),
                  document.body.appendChild(o))
                : (o = document.querySelector(i)),
              (this.geom =
                new e.PlaneBufferGeometry()),
              (this.texture = new e.VideoTexture(o)),
              (this.material = new e.MeshBasicMaterial(
                { map: this.texture }
              ));
            const n = new e.Mesh(
              this.geom,
              this.material
            );
            if (
              (this.sceneWebcam.add(n),
              (this.cameraWebcam =
                new e.OrthographicCamera(
                  -0.5,
                  0.5,
                  0.5,
                  -0.5,
                  0,
                  10
                )),
              navigator.mediaDevices &&
                navigator.mediaDevices.getUserMedia)
            ) {
              const t = {
                video: {
                  width: 1280,
                  height: 720,
                  facingMode: "environment",
                },
              };
              navigator.mediaDevices
                .getUserMedia(t)
                .then((t) => {
                  console.log(
                    "using the webcam successfully..."
                  ),
                    (o.srcObject = t),
                    o.play();
                })
                .catch((t) => {
                  setTimeout(() => {
                    this.createErrorPopup(
                      "Webcam Error\nName: " +
                        t.name +
                        "\nMessage: " +
                        t.message
                    );
                  }, 1e3);
                });
            } else
              setTimeout(() => {
                this.createErrorPopup(
                  "sorry - media devices API not supported"
                );
              }, 1e3);
          }
          update() {
            this.renderer.clear(),
              this.renderer.render(
                this.sceneWebcam,
                this.cameraWebcam
              ),
              this.renderer.clearDepth();
          }
          dispose() {
            this.material.dispose(),
              this.texture.dispose(),
              this.geom.dispose();
          }
          createErrorPopup(t) {
            if (
              !document.getElementById("error-popup")
            ) {
              var e = document.createElement("div");
              (e.innerHTML = t),
                e.setAttribute("id", "error-popup"),
                document.body.appendChild(e);
            }
          }
        }
        const r = new e.Vector3(0, 0, 1),
          a = new e.Euler(),
          h = new e.Quaternion(),
          c = new e.Quaternion(
            -Math.sqrt(0.5),
            0,
            0,
            Math.sqrt(0.5)
          ),
          d = { type: "change" };
        class l extends e.EventDispatcher {
          constructor(t) {
            super(),
              !1 === window.isSecureContext &&
                console.error(
                  "THREE.DeviceOrientationControls: DeviceOrientationEvent is only available in secure contexts (https)"
                );
            const i = this,
              o = new e.Quaternion();
            (this.object = t),
              this.object.rotation.reorder("YXZ"),
              (this.enabled = !0),
              (this.deviceOrientation = {}),
              (this.screenOrientation = 0),
              (this.alphaOffset = 0),
              (this.TWO_PI = 2 * Math.PI),
              (this.HALF_PI = 0.5 * Math.PI),
              (this.orientationChangeEventName =
                "ondeviceorientationabsolute" in window
                  ? "deviceorientationabsolute"
                  : "deviceorientation"),
              (this.smoothingFactor = 1);
            const n = function (t) {
                i.deviceOrientation = t;
              },
              s = function () {
                i.screenOrientation =
                  window.orientation || 0;
              };
            (this.connect = function () {
              s(),
                void 0 !==
                  window.DeviceOrientationEvent &&
                "function" ==
                  typeof window.DeviceOrientationEvent
                    .requestPermission
                  ? window.DeviceOrientationEvent.requestPermission()
                      .then((t) => {
                        "granted" === t &&
                          (window.addEventListener(
                            "orientationchange",
                            s
                          ),
                          window.addEventListener(
                            i.orientationChangeEventName,
                            n
                          ));
                      })
                      .catch(function (t) {
                        console.error(
                          "THREE.DeviceOrientationControls: Unable to use DeviceOrientation API:",
                          t
                        );
                      })
                  : (window.addEventListener(
                      "orientationchange",
                      s
                    ),
                    window.addEventListener(
                      i.orientationChangeEventName,
                      n
                    )),
                (i.enabled = !0);
            }),
              (this.disconnect = function () {
                window.removeEventListener(
                  "orientationchange",
                  s
                ),
                  window.removeEventListener(
                    i.orientationChangeEventName,
                    n
                  ),
                  (i.enabled = !1);
              }),
              (this.update = function () {
                if (!1 === i.enabled) return;
                const t = i.deviceOrientation;
                if (t) {
                  let n = t.alpha
                      ? e.MathUtils.degToRad(t.alpha) +
                        i.alphaOffset
                      : 0,
                    s = t.beta
                      ? e.MathUtils.degToRad(t.beta)
                      : 0,
                    l = t.gamma
                      ? e.MathUtils.degToRad(t.gamma)
                      : 0;
                  const u = i.screenOrientation
                    ? e.MathUtils.degToRad(
                        i.screenOrientation
                      )
                    : 0;
                  if (this.smoothingFactor < 1) {
                    if (this.lastOrientation) {
                      const t = this.smoothingFactor;
                      (n = this._getSmoothedAngle(
                        n,
                        this.lastOrientation.alpha,
                        t
                      )),
                        (s = this._getSmoothedAngle(
                          s + Math.PI,
                          this.lastOrientation.beta,
                          t
                        )),
                        (l = this._getSmoothedAngle(
                          l + this.HALF_PI,
                          this.lastOrientation.gamma,
                          t,
                          Math.PI
                        ));
                    } else
                      (s += Math.PI),
                        (l += this.HALF_PI);
                    this.lastOrientation = {
                      alpha: n,
                      beta: s,
                      gamma: l,
                    };
                  }
                  !(function (t, e, i, o, n) {
                    a.set(i, e, -o, "YXZ"),
                      t.setFromEuler(a),
                      t.multiply(c),
                      t.multiply(
                        h.setFromAxisAngle(r, -n)
                      );
                  })(
                    i.object.quaternion,
                    n,
                    this.smoothingFactor < 1
                      ? s - Math.PI
                      : s,
                    this.smoothingFactor < 1
                      ? l - this.HALF_PI
                      : l,
                    u
                  ),
                    8 *
                      (1 -
                        o.dot(i.object.quaternion)) >
                      1e-6 &&
                      (o.copy(i.object.quaternion),
                      i.dispatchEvent(d));
                }
              }),
              (this._orderAngle = function (
                t,
                e,
                i = this.TWO_PI
              ) {
                return (e > t &&
                  Math.abs(e - t) < i / 2) ||
                  (t > e && Math.abs(e - t) > i / 2)
                  ? { left: t, right: e }
                  : { left: e, right: t };
              }),
              (this._getSmoothedAngle = function (
                t,
                e,
                i,
                o = this.TWO_PI
              ) {
                const n = this._orderAngle(t, e, o),
                  s = n.left,
                  r = n.right;
                (n.left = 0),
                  (n.right -= s),
                  n.right < 0 && (n.right += o);
                let a =
                  r == e
                    ? (1 - i) * n.right + i * n.left
                    : i * n.right + (1 - i) * n.left;
                return (a += s), a >= o && (a -= o), a;
              }),
              (this.dispose = function () {
                i.disconnect();
              }),
              this.connect();
          }
        }
      })(),
      n
    );
  })()
);
