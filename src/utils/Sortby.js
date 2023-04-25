export function sortBy({ renderTasks, SORTBY }) {
  switch (SORTBY) {
    case "default":
      return renderTasks;
    case "importance":
      console.log("maxxx")  
      const importantTasks = renderTasks.filter((task) => task.important);
      const nonImportantTasks = renderTasks.filter((task) => !task.important);
      return [...importantTasks, ...nonImportantTasks];
    default:
      return renderTasks;
  }
}
