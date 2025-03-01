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
import chartToken from './chartToken';
import { emptySeriesUnit } from '../GaugeChart/handleSeries';
import cloneDeep from '../../util/cloneDeep';
import Theme from '../../feature/token';

function getSeriesInit() {
  return {
    type: 'bar',
    coordinateSystem: 'polar',
    emphasis: {
      focus: 'series',
    },
    animation: false,
    stack: 'total',
    showBackground: true,
    backgroundStyle: {
      color: '',
    },
    data: [],
  };
}

export function setSeries(seriesData, iChartOption, chartInstance) {
  const { data, itemStyle, markLine } = iChartOption;
  const series = [];
  const barWidth = Number(iChartOption.barWidth) || chartToken.barWidth;
  data.forEach((item, i) => {
    const seriesUnit = getSeriesInit();
    seriesUnit.name = item.name;
    seriesUnit.data = seriesData[i];
    seriesUnit.itemStyle = item.itemStyle || itemStyle;
    seriesUnit.backgroundStyle.color = chartToken.background;
    seriesUnit.barWidth = barWidth;
    seriesUnit.emphasis = iChartOption.emphasis;
    series.push(seriesUnit);
  });
  // 阈值线
  if (markLine) {
    const markLineUnit = setMarkLine(data, markLine,  iChartOption, chartInstance, barWidth);
    series.push(markLineUnit);
  }
  return series;
}

function getThemeStatusColor(status = 'success'){
  const {colorError, colorAlert, colorWarning, colorSuccess} = Theme.config.colorState
  const statusColorGroup = {
    error: colorError,
    alert: colorAlert,
    warning: colorWarning,
    success: colorSuccess
  }
  return statusColorGroup[status]
}

// 添加一个空series，使用该空series的pointer来作为阈值线的红线
function setMarkLine(data, markLine, iChartOption, chartInstance, barWidth) {
  let {color, status='success', value} = markLine;
  const  marklineColor = getThemeStatusColor(status);
  const temp = cloneDeep(emptySeriesUnit);
  const markLineUnit = cloneDeep(temp);
  if(data[0].value > value){
    color = '#FFFFFF'
  }
  markLineUnit.name = 'markLine';
  markLineUnit.min = iChartOption.min || 0;
  markLineUnit.max = iChartOption.max || 100;
  markLineUnit.startAngle = 90;
  markLineUnit.endAngle = -270;
  markLineUnit.center = iChartOption.position.center || ['50%', '50%'];
  markLineUnit.radius = iChartOption.position.radius || '50%';
  markLineUnit.animation = false;
  let pointerOffsetCenter = computeMarkLinePosition(markLineUnit.radius, barWidth, chartInstance);
  markLineUnit.pointer = {
    icon: 'path://M0 0 L30 0 L30 100 L0 100 Z',
    width: 2,
    length: barWidth / 2 ,
    offsetCenter: iChartOption.markLine.offsetCenter || [0,  -pointerOffsetCenter],
    itemStyle: {
      color:  color || marklineColor,
    }
  };
  markLineUnit.data = [{ value: markLine.value }];
  markLineUnit.silent = true;
  markLineUnit.zlevel = 2;
  return markLineUnit;
}

// 计算阈值线位置 
function computeMarkLinePosition(radius, barWidth, chartInstance){
  let position;
  const width = chartInstance.getWidth();
  const height = chartInstance.getHeight();
  const canvasRadius = width > height ? height / 2 : width / 2;
  if(typeof radius === 'number'){
    position = radius / 2 - (barWidth / 4) 
  }else if(radius.indexOf('%')>-1){
    radius = Number(radius.slice(0,-1)) / 100;
    position = radius*canvasRadius / 2 - (barWidth / 4)
  }else if(typeof radius === 'string'){
    position = Number(radius) / 2 - (barWidth / 4)
  }
  return position
}

// 更新阈值线位置
export function updateMarkLine(iChartOption, eChartOption, chartInstance){
  let radius = iChartOption.position.radius || '50%';
  const barWidth = Number(iChartOption.barWidth) || chartToken.barWidth;
  const pointerOffsetCenter = computeMarkLinePosition(radius, barWidth, chartInstance);
  eChartOption.series.forEach(item=>{
    if(item.name === 'markLine'){
      item.pointer.offsetCenter = iChartOption.markLine.offsetCenter || [0,  -pointerOffsetCenter];
    }
  })
}