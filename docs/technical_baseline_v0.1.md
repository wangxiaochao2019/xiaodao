# Phase 1A｜官方技术基线确认 v0.1

> 状态：已冻结（仅技术基线；禁止据此视为已开始 Phase 1）

## 1. 查询信息

- 查询日期：2026-07-10
- 执行人：Codex
- 项目名称：晓刀｜作品、思考与长期实验
- 查询范围：Node.js、Astro、Cloudflare Workers、Wrangler 官方文档及官方发布公告
- 阶段边界：本次仅确认技术基线，没有创建工程、安装依赖、构建、登录或部署。

## 2. Node.js 基线

### 官方事实

- Node.js 官方当前列出 v26 为 Current，v24（Krypton）与 v22（Jod）为 LTS；生产应用应使用 Active LTS 或 Maintenance LTS，而不是 Current 版本。
- Node.js 官方说明：在 v26 及以前的发布制度中，偶数主版本先经历约 6 个月 Current，随后进入 LTS；LTS 通常提供合计约 30 个月的关键缺陷修复保障。
- Node.js v24 于 2025-05-06 首次发布，当前为 LTS 主版本线。
- Astro 当前要求 Node.js `v22.12.0` 或更高，并仅支持偶数主版本；奇数主版本不受支持。
- Wrangler 支持 Node.js 的 Current、Active 和 Maintenance 版本线。

### 冻结结论

**冻结 Node.js 主版本：24**

原因：Node.js 24 是查询日最新的 LTS 主版本；它满足 Astro 的 `>=22.12.0` 与偶数版本要求，也属于 Wrangler 明确支持的 Node.js 生命周期范围。Node.js 26 虽更新，但仍为 Current，不符合本项目优先采用生产 LTS 的稳定性原则；Node.js 22 虽仍为 LTS，但不是最新 LTS 主版本。

执行约束：Phase 1 仅允许使用 `24.x`，不得自动跨主版本升级到 26。

## 3. Astro 基线

### 官方事实

- Astro 官方于 2026-06-22 发布 Astro 7.0，并明确称 “Astro 7 is here”；官网当前标示 Astro 7.0。
- 官方对新项目继续推荐使用 `latest` 创建，但本项目为可复现性冻结在当前稳定主版本 7。
- 当前 Node.js 支持范围为 `v22.12.0` 或更高的偶数主版本；奇数主版本不受支持。
- Astro 7 稳定版之前存在 alpha 预览；查询日官方当前发布入口已经是稳定版 7.0。所查官方当前资料未显示仍需采用 beta 或 rc 通道，因此本项目不采用 beta、rc 或 alpha。
- Astro 7 仍包含实验性能力，例如 Cloudflare CDN cache provider；Astro 官方同时警告 experimental 特性不保证稳定，甚至可能在小版本或补丁版本中发生破坏性变化。

### 冻结结论

**冻结 Astro 版本：7.0**

原因：7.0 是查询日官方最新稳定主版本，适用于新项目，且与冻结的 Node.js 24 相容。为降低基线漂移，本项目在 Phase 1 不启用任何 experimental flag，不使用 alpha、beta 或 rc 通道。

执行约束：Phase 1 应把实际安装结果锁定在 Astro `7.0.x`；升级到 7.1+ 或 8.x 必须另行评审，不属于本基线授权。

## 4. Wrangler 基线

### 官方事实

- Cloudflare 已正式发布 Wrangler v4；v4 是当前稳定主版本线。
- Cloudflare 官方安装与更新文档推荐在项目内本地安装 `wrangler@latest`，以便团队使用一致版本并支持回滚。
- 官方文档没有在安装页正文固定展示“当前 latest 的精确补丁号”；因此本次不使用非官方来源猜测补丁版本。
- Wrangler 运行环境支持 Node.js 的 Current、Active 和 Maintenance 版本线；操作系统要求为 macOS 13.5+、Windows 11，或支持 glibc 2.35 的 Linux 发行版。
- Wrangler 4.68.0 起支持无配置自动识别与配置 Astro，但纯静态站点采用显式配置更便于审查，也能避免自动安装 Adapter 或自动生成超出计划的配置。

### 冻结结论

**冻结 Wrangler 版本：4**

原因：v4 是当前官方稳定主版本，Cloudflare 官方推荐使用 latest，且与 Node.js 24 兼容。由于官方文档未给出查询日精确补丁号，本阶段冻结 v4 主版本，不伪造补丁号。

执行约束：Phase 1 安装时仅允许解析 `wrangler@latest` 的 v4 版本，并由项目锁文件固定当次解析出的精确版本；如果 `latest` 已跨到 v5，必须停止并重新进行技术基线确认，不得直接安装。

## 5. Cloudflare Workers 静态部署确认

### 官方确认

- 当前官方方案为 **Cloudflare Workers Static Assets**。Cloudflare 推荐新项目使用 Workers；静态资源可以与 Worker 一起部署，也可以采用不含 Worker 脚本的纯静态 assets-only 配置。
- Astro 默认在构建时预渲染页面，可直接把生成的静态资源上传给 Workers；官方明确支持 Astro 静态站点。
- 纯静态 Astro 的推荐显式配置为 Wrangler 配置文件中的 `assets.directory: "./dist"`。
- 纯静态 assets-only 配置不需要 `main` 字段，因为不需要按需渲染/SSR 的 Worker 代码。
- 推荐构建目录：`./dist`。
- 官方推荐构建命令：`npx astro build`。
- 官方推荐部署命令：`npx wrangler deploy`；Cloudflare 的 Astro 框架页也给出 `npx wrangler@latest deploy`。
- `compatibility_date` 应在实际部署配置中设置为部署时日期；该字段控制 Workers 运行时兼容行为。此字段在 Phase 1A 不创建、不写入。

### 最终采用方案

采用 **Astro 默认静态输出 + Cloudflare Workers Static Assets（assets-only）+ 显式 Wrangler 配置**：

- 输出目录：`./dist`
- Wrangler 静态资源目录：`assets.directory = "./dist"`
- 不设置 Worker `main`
- 不启用 SSR / on-demand rendering
- 不依赖 Wrangler 自动配置
- 构建：`npx astro build`
- 部署：`npx wrangler deploy`

以上命令仅作为后续阶段的官方基线记录，本阶段没有执行。

## 6. Astro Cloudflare Adapter 评估

**本项目是否需要：否**

官方依据：Astro 官方说明 `@astrojs/cloudflare` 用于把 on-demand rendered routes、server islands、actions、sessions 等服务端能力部署到 Cloudflare；如果 Astro 作为静态站点构建器，则不需要 Adapter。Cloudflare 的 Astro 指南也明确说明：Astro 默认预渲染全部页面，纯静态站点只需上传静态资源；只有按需渲染/SSR 才要求安装 Cloudflare Adapter。

本项目当前冻结为纯静态站点，因此不得在 Phase 1 自动或手动加入 `@astrojs/cloudflare`。若未来引入 SSR、服务端 Actions、Sessions、运行时绑定或按需渲染，必须先重新评估并更新技术基线。

## 7. 依赖冻结清单

```text
技术基线冻结：
Node.js: 24
Astro: 7.0
Wrangler: 4
```

补充规则：Node.js 与 Wrangler 冻结的是主版本；Astro 冻结为 7.0 版本线。后续实际解析到的补丁版本必须由锁文件记录，不得跨越上述冻结边界。

## 8. 风险记录

### 未来升级风险

- Astro 7 使用 Vite 8、Rust 编译器与新的 Markdown/MDX 管线；未来 Astro 小版本或下一主版本升级可能改变构建输出、插件兼容性或渲染行为。
- Wrangler `latest` 会随官方发布移动；如果不依赖锁文件，团队或 CI 可能解析到不同版本。
- Node.js 24 进入后续生命周期阶段或接近 EOL 时，需要重新评估 Node.js、Astro、Wrangler 的共同支持范围。
- experimental 特性可能在 minor 或 patch 版本中发生破坏性变化；本基线明确禁止启用。

### 未来兼容性风险

- Astro、官方集成及 Vite 插件可能对 Astro 7 / Vite 8 的支持节奏不同，加入任何集成前需要单独核对官方兼容范围。
- Workers 的 `compatibility_date` 会影响运行时行为；未来更新该日期前必须阅读 Cloudflare 兼容性变更说明并完成预览验证。
- Wrangler 的运行环境和操作系统最低要求会变化；CI 镜像升级或降级可能造成 CLI 不受支持。

### 未来迁移风险

- 若从纯静态站点转为 SSR/on-demand rendering，需要引入 `@astrojs/cloudflare`、Worker 入口、兼容标志及可能的 bindings，部署架构会发生实质变化。
- 若依赖数据库、KV、Sessions、Actions 或运行时环境变量，assets-only 方案将不再足够，需要重新进入架构评审。
- 从 Workers Static Assets 迁移到其他平台或旧式 Pages 工作流时，配置、路由、404 与缓存语义可能不同；不得直接复用本基线。

## 9. 官方来源

以下来源均于 **2026-07-10** 访问。

1. Node.js 官方文档｜[Node.js Releases](https://nodejs.org/en/about/previous-releases)
2. Node.js 官方文档｜[Node.js v24 Download Archive](https://nodejs.org/en/download/archive/v24)
3. Node.js 官方公告｜[Evolving the Node.js Release Schedule](https://nodejs.org/en/blog/announcements/evolving-the-nodejs-release-schedule)
4. Astro 官方发布公告｜[Astro 7.0](https://astro.build/blog/astro-7/)
5. Astro 官方文档｜[Install Astro](https://docs.astro.build/en/install-and-setup/)
6. Astro 官方文档｜[Configuring experimental flags](https://docs.astro.build/en/reference/experimental-flags/)
7. Astro 官方文档｜[Deploy your Astro Site to Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
8. Astro 官方文档｜[@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
9. Cloudflare Workers 官方文档｜[Astro](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/)
10. Cloudflare Workers 官方文档｜[Static Assets](https://developers.cloudflare.com/workers/static-assets/)
11. Wrangler 官方文档｜[Install/Update Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
12. Wrangler 官方发布公告｜[Use the latest JavaScript features with Wrangler CLI v4](https://developers.cloudflare.com/changelog/post/2025-03-13-wrangler-v4/)
13. Cloudflare Workers 官方文档｜[Configuration - Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration/)
14. Cloudflare Workers 官方文档｜[Compatibility dates](https://developers.cloudflare.com/workers/configuration/compatibility-dates/)
15. Cloudflare Workers 官方公告｜[No config? No problem. Just `wrangler deploy`](https://developers.cloudflare.com/changelog/post/2026-02-25-wrangler-autoconfig-ga/)

## 完成后检查

### 已完成

- [x] 官方技术基线确认
- [x] 版本冻结
- [x] 部署方案确认
- [x] 官方来源记录

### 未执行

- [x] 未创建工程
- [x] 未安装依赖
- [x] 未创建代码
- [x] 未构建
- [x] 未部署
- [x] 未登录 Cloudflare
- [x] 未创建 Worker
- [x] 未查询域名

## 阶段结论

Phase 1A 官方技术基线确认已完成。技术上允许在取得明确的 Phase 1 启动指令后进入 Phase 1；本次工单没有开始 Phase 1，也不构成自动开始工程创建的授权。
