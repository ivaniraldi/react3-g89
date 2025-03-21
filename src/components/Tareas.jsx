import React, { useState } from "react";
import tareas from "../data/tareas.json";

export default function Tareas() {
  const [listaTareas, setListaTareas] = useState(tareas);
  const [nuevaTarea, setNuevaTarea] = useState({
    tarea: "",
    completada: false,
  });

  const handleNuevaTarea = (e) => {
    setNuevaTarea({ tarea: e, completada: false });
  };

  const completarTarea = (e) => {
    console.log(e);
    let nuevaListaTareas = listaTareas.map((tarea) => {
      if (tarea.tarea === e.tarea) {
        return { ...tarea, completada: !tarea.completada };
      } else {
        return tarea;
      }
    });
    setListaTareas(nuevaListaTareas);
  };

  const agregarTarea = (e) => {
    e.preventDefault();
    setListaTareas([...listaTareas, nuevaTarea]);
    setNuevaTarea({ tarea: "", completada: false });
    console.log(listaTareas);
  };

  const eliminarTarea = (e) => {
    let nuevaListaTareas = listaTareas.filter((tarea) => {
      return tarea.tarea !== e.tarea;
    });
    setListaTareas(nuevaListaTareas);
  };

  return (
    <div>
      <form action="submit" onSubmit={(e) => agregarTarea(e)}>
        <input
          type="text"
          placeholder="Agregar tarea"
          value={nuevaTarea.tarea}
          onChange={(e) => handleNuevaTarea(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {listaTareas.map((tarea, i) => (
          <li
            key={i}
            className={
              tarea.completada === true
                ? "text-success text-decoration-line-through"
                : ""
            }
          >
            <span onClick={() => completarTarea(tarea)}>{tarea.tarea} </span>
            <button onClick={() => eliminarTarea(tarea)}>Eliminar Tarea</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
