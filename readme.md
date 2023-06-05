# Utesa Pensum maker

### Este proyecto toma los datos de tus asignaturas pendinentes y te arma cuatrimestres con limites de 25 creditos por cada uno para proveer la manera mas facil y rapida de completar tu pensum, tomando en cuenta pre-requisitos, co-requisitos y requisitos-especiales de cada materia

## Pasos para ejecutar el proyecto
 - Clona este repositorio
 - una vez dentro de la carpeta del proyecto corre `npm install` para instalar dependencias
 - Luego copia todo el codigo dentro del archivo `extract-browser-data.js`
 - Navega a la pagina de [asignaturas pendientes de utesa](https://www.utesa.edu/webestudi/pagina-asignaturas-pendientes.aspx) pega el codigo y ejecutalo en la terminal de navegador
 - Si todo salio bien deberias obtener los datos de tu pensum en json en la misma consola del navegador.
 - Copia los datos y pegalos en el archivo `pending.json` si quieres puedes eliminar las materias que estes cursando alctualmente de ese archivo
 - Luego abres una consola dentro de la carpeta del proyecto y ejecutas `npm start` 
 - Esto generara dos archivos, uno con los datos en formato json `pensum.json` y el otro en formato html `pensum.html` que puedes abrir en cualquier navegador y listo.