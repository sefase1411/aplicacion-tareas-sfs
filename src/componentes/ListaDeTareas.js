// Importamos las librerías y componentes necesarios
import React, { useState } from 'react';
import TareaFormulario from './TareaFormulario'; // Componente para el formulario de tareas
import Tarea from './Tarea'; // Componente para cada tarea individual
import '../hojas-de-estilo/ListaDeTareas.css'; // Archivo de estilos CSS para la lista de tareas

// Definimos el componente funcional ListaDeTareas
function ListaDeTareas() {
  // Estado para las tareas, inicialmente es un arreglo vacío
  const [tareas, setTareas] = useState([]);
  // Estado para el filtro, inicialmente es 'todas'
  const [filtro, setFiltro] = useState('todas'); // Estado para el filtro

  // Función para agregar una tarea
  const agregarTarea = tarea => {
    // Si el texto de la tarea no está vacío
    if (tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim(); // Eliminamos espacios en blanco al inicio y al final
      const tareasActualizadas = [tarea, ...tareas]; // Agregamos la nueva tarea al inicio del arreglo de tareas
      setTareas(tareasActualizadas); // Actualizamos el estado con las tareas actualizadas
    }
  }

  // Función para eliminar una tarea
  const eliminarTarea = id => {
    // Filtramos las tareas para excluir la tarea con el id especificado
    const tareasActualizadas = tareas.filter(tarea => tarea.id !== id);
    setTareas(tareasActualizadas); // Actualizamos el estado con las tareas restantes
  }

  // Función para completar una tarea
  const completarTarea = id => {
    // Mapeamos el arreglo de tareas y cambiamos el estado de completada de la tarea con el id especificado
    const tareasActualizadas = tareas.map(tarea => {
      if (tarea.id === id) {
        tarea.completada = !tarea.completada; // Cambiamos el estado de completada
      }
      return tarea; // Devolvemos la tarea actualizada
    });
    setTareas(tareasActualizadas); // Actualizamos el estado con las tareas actualizadas
  }

  // Función para cambiar el filtro
  const cambiarFiltro = nuevoFiltro => {
    setFiltro(nuevoFiltro); // Actualizamos el estado del filtro con el nuevo filtro
  }

  // Filtrar las tareas según el estado del filtro
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'completadas') {
      return tarea.completada; // Devolvemos solo las tareas completadas
    } else if (filtro === 'pendientes') {
      return !tarea.completada; // Devolvemos solo las tareas pendientes
    } else {
      return true; // Devolvemos todas las tareas
    }
  });

  return (
    <>
      {/* Componente para el formulario de tareas */}
      <TareaFormulario onSubmit={agregarTarea} />
      
      {/* Contenedor de botones de filtros */}
      <div className='filtros'>
        {/* Botones para cambiar el filtro */}
        <button onClick={() => cambiarFiltro('todas')}>Todas</button>
        <button onClick={() => cambiarFiltro('completadas')}>Completadas</button>
        <button onClick={() => cambiarFiltro('pendientes')}>Pendientes</button>
      </div>
      
      {/* Contenedor de la lista de tareas */}
      <div className='tareas-lista-contenedor'>
        {
          // Mapeamos las tareas filtradas y las renderizamos usando el componente Tarea
          tareasFiltradas.map((tarea) =>
            <Tarea
              key={tarea.id} // Clave única para cada tarea
              id={tarea.id} 
              texto={tarea.texto}
              completada={tarea.completada}
              completarTarea={completarTarea}
              eliminarTarea={eliminarTarea} />
          ) 
        }
      </div>
    </>
  );    
}

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default ListaDeTareas;
