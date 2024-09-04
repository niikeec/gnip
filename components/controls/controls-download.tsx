"use client";

import { EXPORT_SIZES } from "@/lib/const/export-size.const";
import { download } from "@/lib/download";
import { toBlob, toPng, toSvg } from "@/lib/image";
import { previewStore, usePreviewStore } from "@/lib/store/preview.store";
import { ChevronDown, Download } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tooltip } from "../ui/tooltip";

export function ControlsDownload() {
  const params = useParams();

  const { size } = usePreviewStore();

  function savePng() {
    const node = document.getElementById("preview");
    if (!node) return;

    toast.promise(
      toPng(node, { pixelRatio: size }).then((dataUrl) =>
        download(dataUrl, `${params.repo}.png`),
      ),
      {
        loading: "Exporting PNG",
        success: "PNG exported",
        error: "Failed to export PNG",
      },
    );
  }

  function copyPng() {
    const node = document.getElementById("preview");
    if (!node) return;

    navigator.clipboard.write([
      new ClipboardItem({
        "image/png": new Promise((resolve) => {
          toast.promise(
            toBlob(node, {
              pixelRatio: size,
            }).then((blob) => {
              if (!blob) throw new Error("Missing blob");
              resolve(blob);
            }),
            {
              loading: "Copying PNG",
              success: "PNG copied",
              error: "Failed to copy PNG",
            },
          );
        }),
      }),
    ]);
  }

  function saveSvg() {
    const node = document.getElementById("preview");
    if (!node) return;

    toast.promise(
      toSvg(node).then((dataUrl) => download(dataUrl, `${params.repo}.svg`)),
      {
        loading: "Exporting SVG",
        success: "SVG exported",
        error: "Failed to export SVG",
      },
    );
  }

  return (
    <div className="flex items-center gap-1">
      <Tooltip content="Export Image">
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0 size-6"
          onClick={savePng}
        >
          <Download size={16} />
        </Button>
      </Tooltip>

      <DropdownMenu>
        <Tooltip content="More">
          <div className="flex">
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="size-6 data-[state=open]:text-foreground"
              >
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
          </div>
        </Tooltip>
        <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuItem onClick={savePng}>Save PNG</DropdownMenuItem>
          <DropdownMenuItem onClick={saveSvg}>Save SVG</DropdownMenuItem>
          <DropdownMenuItem onClick={copyPng}>Copy Image</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Size</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup value={size.toString()}>
                {EXPORT_SIZES.map((size) => (
                  <DropdownMenuRadioItem
                    key={size}
                    value={size.toString()}
                    onClick={() => (previewStore.size = size)}
                  >
                    {size}x
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}