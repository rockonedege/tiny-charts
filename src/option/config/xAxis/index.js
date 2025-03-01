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
import base from './base';
import name from './name';
import axisLine from './axisLine';
import axisLabel from './axisLabel';
import axisMargin from './axisMargin';
import boundaryGap from './boundaryGap';
import merge from '../../../util/merge';
import { toArray } from '../../../util/type';

/**
 * 
 * @param {object} iChartOpt  图标的配置项
 * @param {Function} callBack 用于在merge外部iChartOpt的配置和内部默认配置之前根据不用类型图表对默认配置进行操作
 * @returns x轴的配置
 */
function xAxis(iChartOpt, callBack) {
  let xAxisResult = iChartOpt.xAxis || {};
  xAxisResult = toArray(xAxisResult).map((xAxisItem, xAxisItemIndex) => {
    const xAxisUnit = base();
    // 坐标轴名称
    name(xAxisUnit, xAxisItem, iChartOpt);
    // 坐标轴两边留白策略
    boundaryGap(xAxisUnit, xAxisItem, iChartOpt);
    // 刻度标签
    axisLabel(xAxisUnit, xAxisItem, iChartOpt);
    // 坐标轴刻度
    axisLine(xAxisUnit, xAxisItem, iChartOpt);
    // 坐标轴前后留白
    axisMargin(xAxisUnit, xAxisItem, iChartOpt);
    callBack && callBack(xAxisUnit, xAxisItemIndex)
    // 覆盖属性
    merge(xAxisUnit, xAxisItem);
    return xAxisUnit;
  });
  return xAxisResult;
}

/**
 * 配置横轴样式
 */
export default xAxis;
