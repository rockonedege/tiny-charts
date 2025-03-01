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

function polar(iChartOption, chartName) {
    const { position } = iChartOption;
    let polarOption = base(position);
    switch (chartName) {
        case 'PolarBarChart':
            break;
        case 'JadeJueChart':
            polarOption.radius = position?.radius || ['20%', '60%'];
            break;
        case 'CircleProcessChart':
            polarOption.radius = position?.radius || ['44%', '50%'];
            break;
        case 'AssembleBubbleChart':
            polarOption.radius = position?.radius || '80%';
            break;
        default:
            polarOption = undefined;
            break;
    }
    return polarOption;
}

export default polar;