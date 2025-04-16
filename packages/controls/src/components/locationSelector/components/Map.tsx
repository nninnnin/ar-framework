import clsx from "clsx";
import React from "react";
import mapboxgl from "mapbox-gl";
import { useRef, useEffect } from "react";

import { useCoordinateStore } from "../store";
import { WithNull } from "../../../types/utils";
import useModelElement from "../../../hooks/useModelElement";
import { useControlStore } from "../../../stores/controls";
import { useModelStore } from "../../../stores";

const Map = () => {
  const mapContinerRef =
    useRef<WithNull<HTMLDivElement>>(null);
  const mapRef = useRef<WithNull<mapboxgl.Map>>(null);
  const locationMarkerRef =
    useRef<WithNull<mapboxgl.Marker>>(null);

  const { selectedModelName } = useModelStore();
  const { setCoordinate: setModelCoordinate } =
    useControlStore();
  const { setCoordinate, coordinate } =
    useCoordinateStore();

  useEffect(() => {
    if (mapRef.current) return;
    if (!mapContinerRef.current) return;

    mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContinerRef.current,
      center: [126.979785, 37.51799],
      zoom: 10,
    });

    map.on("click", (event) => {
      const { lng, lat } = event.lngLat;

      setCoordinate(lat, lng);
      setModelCoordinate(selectedModelName, {
        lat,
        lng,
      });
    });

    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    if (!coordinate) return;

    const { lat, lng } = coordinate;

    if (locationMarkerRef.current) {
      locationMarkerRef.current.setLngLat([lng, lat]);
    } else {
      const marker = document.createElement("div");
      marker.classList.add("marker");

      locationMarkerRef.current = new mapboxgl.Marker(
        marker
      )
        .setLngLat([lng, lat])
        .addTo(mapRef.current);
    }
  }, [coordinate]);

  const { modelElement } = useModelElement();

  useEffect(() => {
    if (!modelElement) return;
    if (!mapRef.current) return;

    const marker = document.createElement("div");
    marker.classList.add("marker", "origin");

    const currentCoordinate =
      modelElement.parentElement.getAttribute(
        "gps-projected-entity-place"
      );

    if (currentCoordinate) {
      const { latitude, longitude } =
        currentCoordinate as unknown as {
          latitude: number;
          longitude: number;
        };

      new mapboxgl.Marker(marker)
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);

      setCoordinate(latitude, longitude);
      setModelCoordinate(selectedModelName, {
        lat: latitude,
        lng: longitude,
      });
    }
  }, [modelElement]);

  return (
    <div
      id="mapbox-container"
      className={clsx(
        "w-[300px] h-[300px] relative",
        "border-solid border-[1px] border-black"
      )}
      ref={mapContinerRef}
    ></div>
  );
};

export default Map;
