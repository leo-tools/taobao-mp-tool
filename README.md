# taobao-mp-tool

## 安装
```bash
npm install -g @leo-tools/tmp
```

## 使用

### 创建小程序
```bash
// 创建淘宝小程序
tmp create taobao-miniapp 

// 创建淘宝小部件
tmp create taobao-livecard

// 创建千牛小程序
tmp create qianniu-miniapp
```

### 生成页面/组件
```bash
// 创建页面
tmp g p

// 创建组件
tmp g c
```

### 增加 feature
```bash
// 增加 lint
tmp add lint
```

### 使用组件
```bash
// 使用组件
tmp use [组件名]
```

#### 组件列表

| 组件名              | 描述    | 使用                         | 平台    |
|------------------|-------|----------------------------|-------|
| color-picker-pro | 颜色选择器 | `tmp use color-picker-pro` | 千牛小程序 |
| image-uploader   | 图片上传  | `tmp use image-uploader`   | 千牛小程序 |
| modal-pro        | 弹窗    | `tmp use modal-pro`        | 千牛小程序 |

