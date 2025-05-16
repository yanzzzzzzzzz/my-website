---
title: Node Version Manager (NVM):安裝、切換Node.js版本的管理器
date: 2022-11-21 10:51:00
tags: [node]
---

## nvm介紹

Node Version Manager (NVM) 是用來管理Node.js版本，可以同時安裝多個不同版本，因應不同專案環境去快速做切換

## 安裝方式

### Windows

Windows環境下到[nvm-windows Releases](https://github.com/coreybutler/nvm-windows/releases)提供最新版本的安裝檔案，Assets處下載nvm-setup的檔案
  
執行exe檔案進行安裝流程

安裝完成後在cmd輸入nvm測試是否安裝成功  若成功會跳出nvm version

```sh
nvm --version
```
<!--more-->
### Linux

使用cURL 或 Wget command:

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

```sh
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash
```

執行以上任何一個command都會下載並執行script，並儲存nvm repo到`~/.nvm`，並將source line新增至profile設定

```sh
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
```

確認nvm是否安裝成功

```sh
nvm --version
```

Troubleshooting:
當出現`nvm: command not found`時, 試著重新開一個terminal再次輸入

若還是出現相同錯誤，則在不同類型終端機下下執行command:

bash: `source ~/.bashrc`

zsh: `source ~/.zshrc`

ksh: `source ~/.profile`

## nvm指令

>以下提到的`<version>`都可以換成任意版本號碼

### 確認版本

```sh
nvm --version
```

### 安裝最新版本Node.js

```sh
nvm install node
```

安裝特定版本Node.js, 在後面輸入版本號, 這裡可以[查詢版本號碼](https://nodejs.org/en/download/releases/)

```sh
nvm install <version>
```

### 查看目前使用的Node.js版本

```sh
nvm list
```

<img src="https://yanzzzzzzzzz.github.io/img/nvm_install_1.png"  width="400"/>

以*顯示當前使用的版本

### 切換Node.js版本

```sh
nvm use <version>
```

顯示`Now using node v<version> (64-bit)`

### 移除Node.js版本

```sh
nvm uninstall <version>
```
