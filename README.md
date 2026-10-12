# Tokyo Night Moon + LazyVim Icons

A VS Code–compatible extension (works in VS Code, Cursor, Windsurf, VSCodium and other forks) that bundles two themes:

- **Tokyo Night Moon (Custom)**: a color theme. It's a modified version of [Tokyo Night Moon](https://github.com/patricknasralla/TokyoNightMoon) by Patrick Nasralla, with a brighter foreground and `#7aa2f7` accents.
- **LazyVim Devicons**: a file icon theme that uses the same Nerd Font glyphs and colors as [nvim-web-devicons](https://github.com/nvim-tree/nvim-web-devicons), so the file tree looks like LazyVim. The font is bundled, so you don't need a Nerd Font installed.

## Install

1. Download the `.vsix` and `SHA256SUMS` from the [latest release](https://github.com/siriknikita/tokyo-night-moon-lazyvim/releases/latest):

   ```sh
   gh release download --repo siriknikita/tokyo-night-moon-lazyvim
   ```

2. Check that the file wasn't altered:

   ```sh
   shasum -a 256 -c SHA256SUMS
   ```

3. Install it into your editor:

   ```sh
   code --install-extension tokyo-night-moon-lazyvim-*.vsix     # VS Code
   cursor --install-extension tokyo-night-moon-lazyvim-*.vsix   # Cursor
   ```

   Or run **Extensions: Install from VSIX…** from the Command Palette.

4. Turn the themes on:

   ```jsonc
   // settings.json
   "workbench.colorTheme": "Tokyo Night Moon (Custom)",
   "workbench.iconTheme": "lazyvim-devicons"
   ```

If you still have the older separate installs (`patricknasralla.tokyo-night-moon` or `local.lazyvim-devicons`), uninstall them so the theme pickers don't show duplicates.

## Develop

| Task | Command |
| --- | --- |
| Regenerate the icon theme from `scripts/sources/*.lua` | `npm run icons` |
| Build the `.vsix` | `npm run package` |

To pick up new icons, replace `scripts/sources/icons_by_file_extension.lua` and `icons_by_filename.lua` with the files from `nvim-web-devicons/lua/nvim-web-devicons/default/`, then regenerate.

To release, bump `version` in `package.json`, add a `CHANGELOG.md` entry, build the `.vsix`, and attach it with a fresh `SHA256SUMS` to a GitHub release tagged `v<version>`.

## Credits and licenses

MIT. See [LICENSE](LICENSE). Third-party parts keep their own licenses in [`licenses/`](licenses):

- Color theme based on Tokyo Night Moon by Patrick Nasralla (MIT).
- Icon mappings from nvim-web-devicons (MIT).
- JetBrains Mono Nerd Font (SIL Open Font License 1.1).
