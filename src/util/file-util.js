export function getFileNameByUrl(url) {
  if (!url) {
    return '';
  }
  return url.substring(url.lastIndexOf('/') + 1);
}

export function downloadMdFile(blob, fileName) {
    let link = document.createElement('a')
    link.href = window.URL.createObjectURL(new Blob([blob]))
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
}
