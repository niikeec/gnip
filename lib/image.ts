import {
  toBlob as htmlToBlob,
  toPng as htmlToPng,
  toSvg as htmlToSvg,
} from "html-to-image";

const imageFilter = (node: HTMLElement) => !node.dataset?.ignoreInExport;

const htmlToImageOptions = {
  filter: imageFilter,
  pixelRatio: 2,
  skipAutoScale: true,
  includeQueryParams: true,
};

export async function toPng(
  node: HTMLElement,
  options?: Parameters<typeof htmlToPng>[1],
) {
  // sometimes the first render doesn't work fully so we do the rendering twice https://github.com/bubkoo/html-to-image/issues/361
  await htmlToPng(node, {
    ...htmlToImageOptions,
    ...options,
  });

  return htmlToPng(node, {
    ...htmlToImageOptions,
    ...options,
  });
}

export async function toBlob(
  node: HTMLElement,
  options?: Parameters<typeof htmlToBlob>[1],
) {
  return htmlToBlob(node, {
    ...htmlToImageOptions,
    ...options,
  });
}

export async function toSvg(
  node: HTMLElement,
  options?: Parameters<typeof htmlToSvg>[1],
) {
  return htmlToSvg(node, {
    ...htmlToImageOptions,
    ...options,
  });
}
