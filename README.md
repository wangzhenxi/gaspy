# gaspy

轻松管理monorepo + 微前端的项目

## Usage

```bash
# 安装依赖
yarn

# 预装配置文件和编译模块
yarn bootstrap

# 启动项目
yarn start
```

## 代码规范

### 工具

- husky: 触发git hooks
- prettier: 代码格式化
- eslint: 语法检测
- [editorconfig](https://editorconfig.org/): 编辑器的文件格式化

### 命名

- `packages`下的包目录名需以根`package.json`的`name`属性为前缀
- 需构建的页面的包名规则为`@rootname-page/xxx`

### 目录结构

```
gaspy
├── packages
|   ├── gaspy-xxx # xxx模块
|   └── gaspy-page-xxx #页面
|       └── src
|           └── index.ts # 默认入口文件
└── package.json
```

