/**
 * Copyright (c) 2024 - present OpenTiny HUICharts Authors.
 * Copyright (c) 2024 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
// 2.4g、5g接入  无线信号
const radioType = {
  TYPE_Straight: 'Straight',
  TYPE_Arrow: 'Arrow',
  TYPE_Dashed: 'Dashed',
  TYPE_Dotted: 'Dotted',
};

// 不同的箭头间隔
const interval = {
  '2.4G': 12,
  '5G': 8,
  'wireless': 8
};

// 连线文本样式
const textStyle = (theme) => {
  return {
    fillStyle: theme.indexOf('dark') !== -1 ? '#f5f5f5' : '#000',
    font: '12px  HarmonyOS Sans',
    unitStyle: theme.indexOf('dark') !== -1 ? '#bbbbbb' : '#999', // 单位字体颜色
    bgStyle: 'transparent' // 文字块背景色
  };
};

// canvas方向
const direction = {
  left: 'left',
  right: 'right'
};

// 置灰态的透明度
// tag、line是直接变灰
// 节点根据类型/mac，判定是否变灰
const opacity = 0.3;

// 设置tag的定位值
const tagPosition = 88;
const tagActivePosition = 80;


// 默认信号强度文本色
const singlecolor = '#36C18D';
// warning信号强度文本色
const singleWarnColor = '#f43146';
// 叶子的2.4G的warning的min值
const singleMin2G = -75;
// 叶子的5G的warning的min值
const singleMin5G = -72;
// 叶子的warning的max值
const singleMax = 0;


// 下钻前的主从网关之间的连线距离
const distanceDefault = 400;
// 下钻前的从网关之间的连线距离
const subRootGap = 20;

// 下钻后的主从网关之间的连线距离
const distanceDrillDefault = 800;

export {
  radioType,
  textStyle,
  direction,
  interval,
  opacity,
  tagPosition,
  singlecolor,
  singleWarnColor,
  singleMin2G,
  singleMin5G,
  singleMax,
  distanceDefault,
  distanceDrillDefault,
  tagActivePosition,
  subRootGap
};

// topo图字段
// interface DeviceInfo {
//   deviceType: DeviceRole; // 设备类型(图片)
//   deviceName: string; // 设备名称
//   onlineStatus: number; // 1 在线
//   mac: string; // 用作唯一标识？
//   connectInterface: 'LAN*' | 'PON*' | 'SSID-2.4G'; // 接入方式
//   // radioType: '2.4G' | '5G'; // 无线
//   onlineDuration: number; // 在线时长
//   signalStrength: number; // 信号强度，不带单位, 2.4G 阈值-75，5G 阈值-72,（单位，自行判断是否超过阈值）
//   rxPower: number; // 光功率（从网关需要判断：SSID 显示信号强度，其他显示光功率。 主网关固定光功率，主网关无信号强度字段。sta 固定信号强度）
//   rxPowerMin: number; // 光功率阈值最小值，用于判断光功率是否需要染色 （主从网关需要判断阈值，超过变红）
//   rxPowerMax: number; // 光功率阈值最大值，用于判断光功率是否需要染色
//   children: DeviceInfo[],
//   faultNum: number, // 故障数量
//   wifiChannel: string; // 信道
//   upNegotiatedRate; // 上行协商速率
//   downNegotiatedRate; // 下行协商速率
//   upRealTimeRate; // 上行实时速率
//   downRealTimeRate; // 下行实时速率
// }