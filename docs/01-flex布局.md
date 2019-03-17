# flex布局

关于flex的布局经验

## 1、主轴方向判断

```css
  flex-direction:column;
```

  a、当前flex-direction为row或row-reverse时，横向为主轴;
  b、当前flex-direction为column或column-reverse，竖向为主轴;

## 对齐方式

justify-content:content // 主轴上的对齐居中
align-items:center // 交叉轴上的对齐居中，值为stretch时父元素不能设置高度,值为baseline时，以第一个子元素的底线为对齐基线

flex-wrap: wrap // 换行,消除换行后的间距,加个适当的总高度;