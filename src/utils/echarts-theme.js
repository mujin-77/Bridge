export const chinaColors = [
  '#f87171',
  '#e99d9d', 
  '#7fd0f3',
  '#f6cb5f', 
  '#57e4b0',
  '#b29ef0'
]

export const chinaTechTheme = {
  color:chinaColors ,

  backgroundColor: 'transparent',

  textStyle: {
    color: '#e2e8f0'
  },
  line: {
    smooth: true,
    symbol: 'circle'
  },
  categoryAxis: {
    axisTick: { show: false }
  },

  title: {
    textStyle: {
      color: '#f87171',
      fontWeight: 'bold'
    }
  },

  legend: {
    textStyle: {
      color: '#e2e8f0'
    }
  },

  tooltip: {
    backgroundColor: 'rgba(15,23,42,0.9)',
    borderColor: '#f87171',
    textStyle: {
      color: '#fff'
    }
  },

  xAxis: {
    axisLine: {
      lineStyle: { color: '#64748b' }
    },
    axisLabel: {
      color: '#cbd5f5'
    },
    splitLine: {
      lineStyle: { color: 'rgba(100,116,139,0.2)' }
    }
  },

  yAxis: {
    axisLine: {
      lineStyle: { color: '#64748b' }
    },
    axisLabel: {
      color: '#cbd5f5'
    },
    splitLine: {
      lineStyle: { color: 'rgba(100,116,139,0.2)' }
    }
  }
}