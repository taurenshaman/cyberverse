# Inclusive NFT

### Backgrounds

Many NFTs are designed with a fixed quantity and fixed price, which can ensure scarcity, but it is difficult to guarantee participation. Especially for NFTs that are positioned in games or fitness, the breadth of the participating crowd is very important.

### Principles

1. The basic principle is inclusiveness, with low barriers to entry, allowing more people to participate.
2. [optional] Consider importing technologies or services like BrightID, Idena, etc. to ensure that it's humans that are minting NFTs.
3. The rich still has the first-mover advantage of capital, and can obtain more minting opportunities by investing more funds.

### Design

1. Assume that the unit of the money/token is `UNIT`, e.g. `DAI`/`USDC`/`DOGE`/`MATIC`/`CKB`/...
2. Assume that the basic price is `N`.
3. The mint price is exponential growth, e.g. `N^x UNIT, x∈[0, +∞)`.

### Examples

The unit of the money is DAI, and the basic price is 2.
* 1st time , mint price: 2^0 = 1 DAI
* 2nd time , mint price: 2^1 = 2 DAI
* 3rd time , mint price: 2^2 = 4 DAI
* 4th time , mint price: 2^3 = 8 DAI
* 5th time , mint price: 2^4 = 16 DAI

---

> 中文版

# 普惠NFT

### 背景

很多NFT被设计成固定数量、固定价格，这样做可以确保稀缺性，但是难以保证参与性。尤其是对于游戏或健身一类的NFT，参与人群的广度非常重要。

### 原则

1. 基本原则是普惠性，进入门槛很低，允许更多的人参与进来。
2. [可选] 可以考虑引入类似BrightID、Idena等的技术或服务，保证是人类在铸造NFT。
3. 富人群体仍然具有资本的先发优势，可以通过投入跟更多资金获得更多铸造机会。

### 设计
1. 假定货币单位是`UNIT`，具体可以是`DAI`/`USDC`/`DOGE`/`MATIC`/`CKB`/...
2. 假定基础价格是`N`。
3. 铸造价格指数增长，比如`N^x UNIT, x∈[0, +∞)`。

### 示例

货币单位是DAI，基础价格为2。
* 第一次铸造，价格：2^0 = 1 DAI
* 第二次铸造，价格：2^1 = 2 DAI
* 第三次铸造，价格：2^2 = 4 DAI
* 第四次铸造，价格：2^3 = 8 DAI
* 第五次铸造，价格：2^4 = 16 DAI

---

2022-2-28
Initial commit.