import Chart from 'chart.js/auto';

const chartHomeJs = () => {
  const totalButton = document.querySelector('#total-link');
  if (totalButton) {
    const ctx = document.querySelector('#myChartHome');

    const good = parseInt(localStorage.getItem('like'), 10)
    const bad = parseInt(localStorage.getItem('dislike'), 10)
    const middle = parseInt(localStorage.getItem('middle'), 10)
    const total = (good + bad + middle)

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

    totalButton.addEventListener('click', () => {
      const good = parseInt(localStorage.getItem('like'), 10)
      const bad = parseInt(localStorage.getItem('dislike'), 10)
      const middle = parseInt(localStorage.getItem('middle'), 10)
      const total = (good + bad + middle)

      myChart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
      myChart.update();

      myChart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });
      chart.update();
      // const dislikeStats = Math.round((bad / total)*100)
      // const likeStats = Math.round((good / total)*100)
      // const middleStats = Math.round((middle / total)*100)
      // const goodPc = Math.round((parseInt(good, 10) * 100) / parseInt(total, 10))
      // const middlePc = Math.round((parseInt(middle, 10) * 100) / parseInt(total, 10))
      // const badPc = Math.round((parseInt(bad, 10) * 100) / parseInt(total, 10))


      const totalContainer = document.querySelector('.total-container')
      totalContainer.style.display = 'flex';
    })

    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        const totalContainer = document.querySelector('.total-container')
        totalContainer.style.display = 'none';
      })

    };

  };

}

export { chartHomeJs }
