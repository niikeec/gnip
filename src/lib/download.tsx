export function download(dataURL: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataURL;
  link.click();
}
