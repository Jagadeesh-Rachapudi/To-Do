export function sortBy({ renderTasks, SORTBY }) {
  switch (SORTBY) {
    case "default":
      return renderTasks;
    case "importance":
      const importantTasks = renderTasks.filter((task) => task.important);
      const nonImportantTasks = renderTasks.filter((task) => !task.important);
      return [...importantTasks, ...nonImportantTasks];
    default:
      return renderTasks;
  }
}
