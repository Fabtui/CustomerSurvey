const editFormSelectFolder = () => {
  const editContainer = document.querySelector('.edit-container');
  if (editContainer) {
    if (editContainer.dataset.folder) {
      const folderId = editContainer.dataset.folder
      const folderSelect = document.querySelector('#event_folder')
      folderSelect.value = folderId
    } else {
      return
    }
  };
}

export { editFormSelectFolder };
