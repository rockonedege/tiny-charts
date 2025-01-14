const option = {
  theme:"hdesign-dark",
  data: [
    { time: '09:00', 'Domestic': 35 },
    { time: '10:00', 'Domestic': 35 },
    { time: '11:00', 'Domestic': 24 },
    { time: '12:00', 'Domestic': 24 },
    { time: '13:00', 'Domestic': 24 },
    { time: '14:00', 'Domestic': 30 },
    { time: '15:00', 'Domestic': 30 },
    { time: '16:00', 'Domestic': 30 },
  ],
  xAxis: {
    data: 'time'
  },
  yAxis: {
    max: 45,
    name: '百分比',
    interval: 15
  },
  markLine: {
    top: 80,
    bottom: 27.5,
    bottomLabel: '达标红线：目标27.5',
  },
  series: [
    {
      name: 'Domestic',
      symbolSize: 15,
      symbol:'circle',
      showSymbol: true,
      hoverAnimation: false,
      label: {
        show: true,
        textStyle: {
          color: 'green',
          fontSize: 12,
          lineHeight: 16
        },
        formatter: params => {
          if (params.name === '11:00') return '-0.23\n煤质变化';
          if (params.name === '14:00') return '+0.17\n煤质变化';
          return '';
        }
      },
      markPoint: {
        data: [
          {
            xAxis: '11:00',
            yAxis: 0,
            symbolSize: [30, 119],
            symbolOffset: [0, -60],
            symbol: 'image://image/charts/markPoint/rectangle-blue.png'
          },
          {
            xAxis: 5,
            yAxis: 0,
            symbolSize: [30, 119],
            symbolOffset: [0, -60],
            symbol: 'image://image/charts/markPoint/rectangle-blue.png'
          }
        ]
      }
    }
  ]
};


