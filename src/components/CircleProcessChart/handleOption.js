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
import defendXSS from '../../util/defendXSS';
import chartToken from './chartToken';
// 获取bar的series数据
export function getSeriesData(data) {
  const seriesData = [];
  data.forEach((item, i) => {
    seriesData[i] = [];
    seriesData[i][0] = item.value;
  });
  return seriesData;
}

function tooltipFormatter(params) {
  const seriesName = params.seriesName;
  const color = params.color;
  const value = params.value;
  const htmlString = `<div>
                            <span style="display:inline-block;width:10px;height:10px;
                            margin-right:8px;border-radius:5px;border-style: solid;border-width:1px;
                            border-color:${defendXSS(color)};background-color:${defendXSS(color)};"></span>
                            <span style="margin-right:16px">${defendXSS(seriesName)}</span>
                            <span>${defendXSS(value)}</span>
                       </div>`;
  return htmlString;
}

/**
 * 配置默认的鼠标悬浮提示框
 */
export function setTooltip(baseOpt) {
  if (!baseOpt.tooltip.formatter) {
    baseOpt.tooltip.formatter = tooltipFormatter;
  }
}

/**
 * 配置Title
 */
export function setTitle(iChartOption) {
  const { title } = iChartOption;
  if (!title.subtextStyle || !title.subtextStyle?.color) {
    if (!title.subtextStyle) title.subtextStyle = {}
    title.subtextStyle.color = chartToken.descRichColor
  }
  if (!title.textStyle || !title.textStyle?.color) {
    if (!title.textStyle) title.textStyle = {}
    title.textStyle.color = chartToken.detailRichColor
  }
  if (title.textStyle && title.textStyle.rich) {
    for (const key in title.textStyle.rich) {
      const element = title.textStyle.rich[key];
      if (!element.color) {
        element.color = chartToken.detailRichColor
      }
    }
  }
}