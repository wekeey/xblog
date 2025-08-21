# 贡献指南

感谢你考虑为 xblog 项目做出贡献！

## 开发流程

1. **Fork 仓库**

   ```bash
   git clone https://github.com/wekeey/xblog.git
   cd xblog
   ```

2. **安装依赖**

   ```bash
   pnpm install
   ```

3. **创建分支**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **开发和测试**

   ```bash
   # 启动开发服务器
   pnpm dev

   # 代码检查
   pnpm lint

   # 类型检查
   pnpm type-check

   # 格式化代码
   pnpm format
   ```

5. **提交更改**

   ```bash
   git add .
   git commit -m "feat: 添加新功能"
   git push origin feature/your-feature-name
   ```

6. **创建 Pull Request**

## 代码规范

- 使用 TypeScript 编写代码
- 遵循 ESLint 和 Prettier 配置
- 为新功能添加适当的类型定义
- 保持代码简洁和可读性

## 提交信息规范

使用约定式提交 (Conventional Commits):

- `feat:` 新功能
- `fix:` 错误修复
- `docs:` 文档更新
- `style:` 代码格式化
- `refactor:` 代码重构
- `test:` 添加测试
- `chore:` 构建过程或辅助工具的变动

## 问题报告

如果你发现了 bug 或有功能请求，请：

1. 检查是否已有相关 issue
2. 使用 issue 模板创建新的 issue
3. 提供详细的复现步骤和环境信息

## 开发建议

- 在开发前先与维护者讨论大的功能变更
- 保持 PR 的范围小且专注
- 添加必要的文档和注释
- 确保代码通过所有检查

谢谢你的贡献！🎉
