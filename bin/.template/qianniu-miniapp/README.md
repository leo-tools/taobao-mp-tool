# Qianniu apps



## Getting started


### Branch

- `main` - production
- `develop`  - uat/dev

### Install dependencies
```
npm install
```

### Run
1. Open [淘宝开发者工具](https://developer.taobao.com/?spm=a219a.15212435.0.0.5ca4669aNGD65d)
2. Select `小程序 PC 版` tab
3. Click `打开项目` button
4. Select root directory as project path
5. Select `小程序 PC 版` as project type

### Development
#### Add a tab page
1.	Create a new page in the `tabpages` folder.
2.	Include the new page as a component in `pages/index/index.json`.
3.	Set up the route view in `pages/index/index.axml`.
4.	Configure `routerConfig` and `menu` in `pages/index/index.js`.

### Release

1. Checkout to `main` branch
2. In root directory, click `上传` button in 淘宝开发者工具
3. Add release tag in `main` branch

### Environment

change env in line 7 of `/apis/index.js`
```
export const env = envMap.dev; // use dev environment
```
