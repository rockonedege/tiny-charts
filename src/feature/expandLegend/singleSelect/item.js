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
import { CSS_CLASS, SVG_ICON } from "./constants";
import { svgTransform } from "../../../util/convert";

const CIRCLE = "circle";
const LINE = "line";
// 创建每条下拉选项
function item(data, index, color, itemStyle) {
    const itemDom = document.createElement("div");
    itemDom.classList.add(CSS_CLASS.ITEM);
    itemDom.dataset.id = index;
    itemDom.style.setProperty("--active-color", color);
    const itemIcon = document.createElement("div");
    if (itemStyle?.icon === LINE) {
        itemIcon.classList.add(CSS_CLASS.ITEM_ICON_LINE);
    } else {
        itemIcon.classList.add(CSS_CLASS.ITEM_ICON_CIRCLE);
    }
    const itemName = document.createElement("span");
    itemName.innerText = data.name;
    itemName.title = data.name;
    itemName.classList.add(CSS_CLASS.ITEM_NAME);
    if (data.selected) {
        itemIcon.classList.add("active");
        itemName.classList.add("active");
    }
    const copy = document.createElement('img')
    copy.classList.add('copy')
    if(itemStyle?.copy){
        const svg1 = svgTransform(SVG_ICON.COPY1)
        const svg2 = svgTransform(SVG_ICON.COPY2)
        copy.src = svg1

        copy.addEventListener('mouseover', (e) => {
            e.stopPropagation()
            copy.src = svg2
        })
        copy.addEventListener('mouseleave', (e) => {
            e.stopPropagation()
            copy.src = svg1
        })
        copy.addEventListener('click', async (e) => {
            e.stopPropagation()
            let clipboard = navigator.clipboard || {
                writeText: (text) => {
                    let copyInput = document.createElement('input');
                    copyInput.value = text;
                    document.body.appendChild(copyInput);
                    copyInput.select();
                    document.execCommand('copy');
                    document.body.removeChild(copyInput);
                }
            }
            if (clipboard) {
                await clipboard.writeText(data.name);
            }
        })
    }
    itemDom.append(itemIcon, itemName, copy);

    return itemDom;
}

export { item };