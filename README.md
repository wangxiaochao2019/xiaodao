# 晓刀｜作品、思考与长期实验

Astro 7、TypeScript 与原生 CSS 构成的纯静态个人网站工程。

## 环境

- Node.js 24
- npm 11 或更高版本

进入项目后显式加载现有 nvm 环境：

```sh
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
nvm use 24
```

## 本地命令

```sh
npm install
npm run check
npm run dev
npm run build
npm run preview
```

Cloudflare Workers 使用 `wrangler.jsonc` 中的 Static Assets assets-only 配置，构建目录为 `./dist`。当前正式站点地址尚未确认，因此 `siteUrl` 保持未配置，`@astrojs/sitemap` 已安装但暂未在 Astro 配置中启用。正式地址确认后再统一配置 Canonical 并启用 sitemap。

本阶段不执行 Cloudflare 登录或部署。
