// Regenerates icons/lazyvim-icon-theme.json from the nvim-web-devicons tables
// in scripts/sources/. Run with: node scripts/generate-icons.mjs
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCES = path.join(ROOT, "scripts", "sources");
const OUTPUT = path.join(ROOT, "icons", "lazyvim-icon-theme.json");

const DEFAULT_COLOR = "#82aaff";
const FONT_ID = "nerdfonts";

const extLua = fs.readFileSync(path.join(SOURCES, "icons_by_file_extension.lua"), "utf8");
const nameLua = fs.readFileSync(path.join(SOURCES, "icons_by_filename.lua"), "utf8");

function parseLuaTable(lua) {
  const result = {};
  const entryRegex = /\[\s*"([^"]+)"\s*\]\s*=\s*{([\s\S]*?)}/g;

  let entry;
  while ((entry = entryRegex.exec(lua)) !== null) {
    const key = entry[1];
    const body = entry[2];

    const iconMatch = body.match(/icon\s*=\s*"([^"]+)"/);
    if (!iconMatch) continue;

    const colorMatch = body.match(/color\s*=\s*"([^"]+)"/);

    result[key] = {
      icon: iconMatch[1],
      color: colorMatch ? colorMatch[1] : null,
    };
  }

  return result;
}

function fontIcon(character, color = DEFAULT_COLOR) {
  return { fontCharacter: character, fontId: FONT_ID, fontColor: color };
}

const theme = {
  fonts: [
    {
      id: FONT_ID,
      src: [{ path: "./fonts/JetBrainsMonoNerdFont-Regular.ttf", format: "truetype" }],
      weight: "normal",
      style: "normal",
      size: "100%",
    },
  ],
  iconDefinitions: {
    _default: fontIcon("\uf0f6"), // nf-fa-file_text_o
    _folder: fontIcon("\ue5ff"), // nf-custom-folder
    _folder_open: fontIcon("\ue5fe"), // nf-custom-folder_open
  },
  fileExtensions: {},
  fileNames: {},
  file: "_default",
  folder: "_folder",
  folderExpanded: "_folder_open",
};

function addIcons(table, prefix, target) {
  for (const [match, data] of Object.entries(table)) {
    const key = `${prefix}${match.replace(/[^a-zA-Z0-9]/g, "_")}`;
    theme.iconDefinitions[key] = fontIcon(data.icon, data.color ?? DEFAULT_COLOR);
    target[match] = key;
  }
}

addIcons(parseLuaTable(extLua), "_ext_", theme.fileExtensions);
addIcons(parseLuaTable(nameLua), "_name_", theme.fileNames);

fs.writeFileSync(OUTPUT, JSON.stringify(theme, null, 2) + "\n", "utf8");
console.log(`Wrote ${path.relative(ROOT, OUTPUT)}`);
