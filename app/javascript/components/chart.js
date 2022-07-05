import Chart from 'chart.js/auto';

const chartJs = () => {
  const indexContainer = document.querySelector('.events-container')
  if (indexContainer) {
    const ctx = document.querySelectorAll('#myChart');
    ctx.forEach(ctx => {
      const good = ctx.dataset.good
      const middle = ctx.dataset.middle
      const bad = ctx.dataset.bad
      const total = ctx.dataset.total
      const goodPc = Math.round((parseInt(good, 10) * 100) / parseInt(total, 10))
      const middlePc = Math.round((parseInt(middle, 10) * 100) / parseInt(total, 10))
      const badPc = Math.round((parseInt(bad, 10) * 100) / parseInt(total, 10))
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['', '', '', ''],
          datasets: [{
            label: 'Nombre de votes',
            data: [bad, middle, good, total],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(14, 203, 67, 0.2)',
              'rgba(0, 0, 0, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(14, 203, 67, 1)',
              'rgba(0, 0, 0, 0.8)'
            ],
            borderWidth: 1
          }
        //   ,
        //   {
        //   label: "%",
        //   type: "line",
        //   backgroundColor: "rgba(0,0,0,0.2)",
        //   backgroundColorHover: "#3e95cd",
        //   data: [badPc,middlePc,goodPc,100]
        // }
      ]
        },
      options: {
        }
      });
    });
  }
}

export { chartJs }
